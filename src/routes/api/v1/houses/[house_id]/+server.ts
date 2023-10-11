import { pgHouses } from '$lib/database/schema.js';
import db from '$lib/server/db.js';
import { houseSchemas } from '$lib/zod_schemas.js';
import { actionResult, superValidate } from 'sveltekit-superforms/server';
import { eq } from 'drizzle-orm';
import { atLeastOneFieldUpdated, updateImageOrNothing, getRequestFormData, deleteImageFromVercel } from '$lib/server/helpers';
import type { z } from 'zod';
import { error, json } from '@sveltejs/kit';

async function getHouseByIdFull(id: number) {
    try {
        const result = await db.query.pgHouses.findFirst({
            where(fields, operators) {
                return operators.eq(fields.id, id)
            },
            columns: {
                name: true,
                region: true,
                district: true,
                location_description: true,
                wifi_speed: true,
                image_url: true,
            },
        })
        return result ?? null;
    }
    catch {
        return undefined;
    }
}

async function getHouseByIdPartial(id: number) {
    try {
        const result = await db.query.pgHouses.findFirst({
            where(fields, operators) {
                return operators.eq(fields.id, id)
            },
            columns: {
                fk_renter: true,
                image_url: true
            }
        })
        return result ?? null;
    }
    catch {
        return undefined;
    }
}

async function updateHouseWithId(id: number, data: z.infer<typeof houseSchemas.patch> & { image_url?: string | undefined }) {
    //* Check if at least 1 updated field exists
    try {
        await db.update(pgHouses).set(data).where(eq(pgHouses.id, id));
        return true;
    }
    catch (e) {
        return false;
    }
}

/**
 * @openapi
 * /api/v1/houses/{id}:
 *   get:
 *     description: "Gets a single house."
 *     tags:
 *       - "Houses"
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The house ID."
 *     responses:
 *       200:
 *         description: "Gets a single house."
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 name:
 *                   type: "string"
 *                   example: "BAHAR─░YE ERASMUS HOUSE"
 *                 region:
 *                   type: "string"
 *                   example: "KADIK├ûY"
 *                 district:
 *                   type: "string"
 *                   example: "OSMANA─₧A"
 *                 location_description:
 *                   type: "string"
 *                   example: "*omitted*"
 *                 wifi_speed:
 *                   type: "number"
 *                   example: 50
 *                 image_url:
 *                   type: "string"
 *                   example: "https://ghryg4oekbndllfk.public.blob.vercel-storage.com/banner-cIMQn3oWYmBK2lWw1mtF19WSbxc7ec.webp"
 *       404:
 *         description: "The house with the specified id does not exist."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function GET({ params }) {
    //TODO: Add more info about the house. (renter info, calculated available rooms, etc.)

    const houseId = Number(params.house_id) ?? -1;
    const dbHouse = await getHouseByIdFull(houseId);
    if (dbHouse === null) throw error(404, "The house with the specified id does not exist.");
    if (dbHouse === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    return json(dbHouse);
}

/**
 * @openapi
 * /api/v1/houses/{id}:
 *   patch:
 *     description: "Updates a house listing (requires to be logged-in as a renter that created the house)."
 *     tags:
 *       - "Houses"
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The house ID."
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: "object"
 *             properties:
 *               name:
 *                 type: "string"
 *                 example: "Butas Kaune 1"
 *               region:
 *                 type: "string"
 *                 example: "Kaunas"
 *               district:
 *                 type: "string"
 *                 example: "┼áilainiai"
 *               location_description:
 *                 type: "string"
 *                 example: "Arti parduotuv─ù."
 *               wifi_speed:
 *                 type: "integer"
 *                 example: "20"
 *               image:
 *                 type: "string"
 *                 format: "binary"
 *     responses:
 *       200:
 *         description: "Successfully updated the house listing."
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 type:
 *                   type: "string"
 *                   example: "success"
 *                 status:
 *                   type: "number"
 *                   example: 200
 *                 data:
 *                   type: "string"
 *                   example: "*omitted*"
 *       400:
 *         description: "The request formData is invalid. Please check your data and try again."
 *       401:
 *         description: "User was not logged-in as a renter or is not the one that created the specified house."
 *       404:
 *         description: "The house with the specified id does not exist."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function PATCH({ request, locals, params }) {
    //* Authenticated as a renter.
    if (locals.user?.role !== "renter") return actionResult('error', "Only renters can update houses. Please login.", 401);

    //* Got form data in the request.
    const formData = await getRequestFormData(request);
    if (formData === null) return actionResult('error', "The request formData is invalid. Please check your data and try again.", 400);

    //* Validate the form data.
    const form = await superValidate(formData, houseSchemas.patch);
    if (!form.valid) return actionResult('failure', { form }, 400);

    //* Find the house
    const houseId = Number(params.house_id) ?? -1;
    const dbHouse = await getHouseByIdPartial(houseId);
    if (dbHouse === null) return actionResult('error', "The house with the specified id does not exist.", 404);
    if (dbHouse === undefined) return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);

    //* Check if the logged-in user is the one that created it.
    if (dbHouse.fk_renter !== locals.user.id) return actionResult('error', "The specified house was created by a different renter.", 401);

    //* Upload the new image and delete the old one if provided.
    const image = formData.get("image") as File | null;
    const newImageUrl = await updateImageOrNothing(dbHouse.image_url, image);

    //* Update the house with the new information.
    const updateData = { ...form.data, image_url: newImageUrl ?? undefined };
    if (atLeastOneFieldUpdated(updateData) === false) return actionResult('error', "The request formData is invalid. Please check your data and try again.", 400);

    const updateResult = await updateHouseWithId(houseId, updateData);
    if (updateResult === false) return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);

    return actionResult('success', { form }, 200);
}

/**
 * @openapi
 * /api/v1/houses/{id}:
 *   delete:
 *     description: "Deletes a house listing (requires to be logged-in as a renter that created the house)."
 *     tags:
 *       - "Houses"
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The house ID."
 *     responses:
 *       200:
 *         description: "Successfully deleted the house listing."
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 message:
 *                   type: "string"
 *                   example: "Successfully deleted house listing."
 *       401:
 *         description: "User was not logged-in as a renter or is not the one that created the specified house."
 *       404:
 *         description: "The house with the specified id does not exist."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function DELETE({ locals, params }) {
    //* Authenticated as a renter.
    if (locals.user?.role !== "renter") throw error(401, "Only renters can delete houses. Please login.");

    //* Find the house
    const houseId = Number(params.house_id) ?? -1;
    const dbHouse = await getHouseByIdPartial(houseId);
    if (dbHouse === null) throw error(404, "The house with the specified id does not exist.");
    if (dbHouse === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    //* Check if the logged-in user is the one that created it.
    if (dbHouse.fk_renter !== locals.user.id) throw error(401, "The specified house was created by a different renter.");

    //* Delete the listing.
    try {
        await db.delete(pgHouses).where(eq(pgHouses.id, houseId));
    }
    catch (e) {
        throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    }

    //* Delete the uploaded image.
    const imageDelResult = await deleteImageFromVercel(dbHouse.image_url);
    if (imageDelResult === false) {
        //TODO: By this point the house is deleted. Error message might be misleading.
        throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    }

    return json({
        message: "Successfully deleted the house listing."
    });
}
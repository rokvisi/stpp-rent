import { pgHouses } from '$lib/database/schema.js';
import db from '$lib/server/db.js';
import { houseSchemas } from '$lib/zod_schemas.js';
import { actionResult, superValidate } from 'sveltekit-superforms/server';
import { eq } from 'drizzle-orm';
import { atLeastOneFieldUpdated, updateImageOrNothing, getRequestFormData, deleteImageFromVercel } from '$lib/server/helpers';
import type { z } from 'zod';
import { json } from '@sveltejs/kit';

async function getHouseById(id: number) {
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
    console.log("New image in dbUpdate:", data.image_url);

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
    const houseId = Number(params.id) ?? -1;
    const dbHouse = await getHouseById(houseId);
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
    if (locals.user?.role !== "renter") return actionResult('error', "Only renters can delete houses. Please login.", 401);

    //* Find the house
    const houseId = Number(params.id) ?? -1;
    const dbHouse = await getHouseById(houseId);
    if (dbHouse === null) return actionResult('error', "The house with the specified id does not exist.", 404);
    if (dbHouse === undefined) return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);

    //* Check if the logged-in user is the one that created it.
    if (dbHouse.fk_renter !== locals.user.id) return actionResult('error', "The specified house was created by a different renter.", 401);

    //* Delete the listing.
    try {
        await db.delete(pgHouses).where(eq(pgHouses.id, houseId));
    }
    catch {
        return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);
    }

    //* Delete the uploaded image.
    const imageDelResult = await deleteImageFromVercel(dbHouse.image_url);
    if (imageDelResult === false) {
        //TODO: By this point the house is deleted. Error message might be misleading.
        return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);
    }

    return json({
        message: "Successfully deleted the house listing."
    });
}
import { pgHouses } from '$lib/database/schema.js';
import db from '$lib/server/database/db.js';
import { houseSchemas } from '$lib/zod_schemas.js';
import { actionResult, superValidate } from 'sveltekit-superforms/server';
import { put, del } from "@vercel/blob";
import { eq } from 'drizzle-orm';
import { error, json } from '@sveltejs/kit';

async function getRequestFormData(request: Request) {
    try {
        return await request.formData();
    } catch (e) {
        return null; //? Invalid request body or somehow already consumed.
    }
}

async function uploadImageToVercel(filename: string, file: File) {
    try {
        const { url } = await put(filename, file, { access: "public" });
        return url;
    }
    catch {
        return null; //? Service unavailable or broken file.
    }
}

/**
 * @openapi
 * /api/v1/houses:
 *   post:
 *     description: "Creates a house listing (requires to be logged-in as a renter)"
 *     tags:
 *       - "Houses"
 *     responses:
 *       200:
 *         description: "Successfully created listing!"
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
 *         description: "Only renters can create houses. Please login."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: "object"
 *             required:
 *               - "name"
 *               - "region"
 *               - "district"
 *               - "location_description"
 *               - "wifi_speed"
 *               - "image"
 *             properties:
 *               name:
 *                 type: "string"
 *                 example: "Butas Kaune 1"
 *               region:
 *                 type: "string"
 *                 example: "Kaunas"
 *               district:
 *                 type: "string"
 *                 example: "Šilainiai"
 *               location_description:
 *                 type: "string"
 *                 example: "Arti parduotuvė."
 *               wifi_speed:
 *                 type: "integer"
 *                 example: "20"
 *               image:
 *                 type: "string"
 *                 format: "binary"
 * 
*/
export async function POST({ request, locals }) {
    //* Authenticated as a renter.
    if (locals.user?.role !== "renter") return actionResult('error', "Only renters can create houses. Please login.", 401);

    //* Got form data in the request.
    const formData = await getRequestFormData(request);
    if (formData === null) return actionResult('error', "The request formData is invalid. Please check your data and try again.", 400);

    //* Validate the form data.
    const form = await superValidate(formData, houseSchemas.create);
    if (!form.valid) return actionResult('failure', { form }, 400);

    //* Extract the image
    const image = formData.get("image") as File;
    if (!image) return actionResult('error', "The request formData is invalid. Please check your data and try again.", 400);

    //* Get the remaining data
    const { name, region, district, location_description, wifi_speed } = form.data;

    //* Upload the image to vercel.
    const image_url = await uploadImageToVercel(image.name, image);
    if (!image_url) return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);

    //* Insert the house into the database.
    try {
        await db.insert(pgHouses).values({
            name,
            region,
            district,
            location_description,
            wifi_speed,
            image_url,
            fk_renter: locals.user.id,
        })
    }
    catch {
        return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);
    }

    return actionResult('success', { form }, 200);
}

/**
 * @openapi
 * /api/v1/houses:
 *   get:
 *     description: "Gets all house listings"
 *     tags:
 *       - "Houses"
 *     responses:
 *       200:
 *         description: "Returns a list of houses."
 *         content:
 *           application/json:
 *             schema:
 *               type: "array"
 *               items:
 *                 type: "object"
 *                 properties:
 *                   name:
 *                     type: "string"
 *                     example: "BAHAR─░YE ERASMUS HOUSE"
 *                   region:
 *                     type: "string"
 *                     example: "KADIK├ûY"
 *                   district:
 *                     type: "string"
 *                     example: "OSMANA─₧A"
 *                   location_description:
 *                     type: "string"
 *                     example: "*omitted*"
 *                   wifi_speed:
 *                     type: "number"
 *                     example: 50
 *                   image_url:
 *                     type: "string"
 *                     example: "https://ghryg4oekbndllfk.public.blob.vercel-storage.com/banner-cIMQn3oWYmBK2lWw1mtF19WSbxc7ec.webp"
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 *     parameters:
 *       - in: "query"
 *         name: "offset"
 *         description: "The number of houses to skip."
 *         schema:
 *           type: "integer"
 *           default: 0
 *       - in: "query"
 *         name: "limit"
 *         description: "The numbers of houses to return"
 *         schema:
 *           type: "integer"
 *           default: 10
 * 
*/
export async function GET({ url }) {
    //TODO: Add more info about the house. (renter info, calculated available rooms, etc.)

    const limit = Number(url.searchParams.get('limit')) || 10;
    const offset = Number(url.searchParams.get('offset')) || 0;

    try {
        const res = await db.query.pgHouses.findMany({
            columns: {
                name: true,
                region: true,
                district: true,
                location_description: true,
                wifi_speed: true,
                image_url: true,
            },
            limit,
            offset
        })

        return json(res);
    }
    catch {
        throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    }
}

/**
 * @openapi
 * /api/v1/houses:
 *   put:
 *     description: "Update a house listing."
 *     tags:
 *       - "Houses"
 *     responses:
 *       200:
 *         description: "Updated successfully!"
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function PUT({ request, locals }) {
    //TODO: Implement
    return new Response();
}

/**
 * @openapi
 * /api/v1/houses:
 *   delete:
 *     description: "Deletes a house listing (requires to be logged-in as a renter)"
 *     tags:
 *       - "Houses"
 *     responses:
 *       200:
 *         description: "Successfully deleted listing!"
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
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: "object"
 *             required:
 *               - "id"
 *             properties:
 *               id:
 *                 type: "integer"
 *                 example: "1"
 * 
*/
export async function DELETE({ request, locals }) {
    //* Authenticated as a renter.
    if (locals.user?.role !== "renter") return actionResult('error', "Only renters can delete houses. Please login.", 401);

    //* Got form data in the request.
    const formData = await getRequestFormData(request);
    if (formData === null) return actionResult('error', "The request formData is invalid. Please check your data and try again.", 400);

    //* Validate the form data.
    const form = await superValidate(formData, houseSchemas.delete);
    if (!form.valid) return actionResult('failure', { form }, 400);

    //* Extract the data.
    const { id } = form.data;

    //* Get the house specified in the body id.
    let dbResult = undefined;
    try {
        dbResult = await db.query.pgHouses.findFirst({
            where: eq(pgHouses.id, id),
            columns: {
                fk_renter: true,
                image_url: true,
            }
        })
    }
    catch {
        return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);
    }
    if (dbResult === undefined) return actionResult('error', "The house with the specified id does not exist.", 404);

    //* Check if the logged-in user is the one who created the listing.
    if (dbResult.fk_renter !== locals.user.id) return actionResult('error', "The specified house was created by a different renter.", 401);

    //* Delete the listing.
    try {
        await db.delete(pgHouses).where(eq(pgHouses.id, id));
    }
    catch {
        return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);
    }

    //* Delete the uploaded image.
    try {
        await del(dbResult.image_url);
    }
    catch {
        //TODO: By this point the house is deleted. Error message might be misleading.
        return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);
    }

    return actionResult('success', { form }, 200);
}
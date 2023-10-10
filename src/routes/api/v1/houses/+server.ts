import { pgHouses } from '$lib/database/schema.js';
import db from '$lib/server/db.js';
import { houseSchemas } from '$lib/zod_schemas.js';
import { actionResult, superValidate } from 'sveltekit-superforms/server';
import { error, json } from '@sveltejs/kit';
import { getRequestFormData, uploadImageToVercel } from '$lib/server/helpers';

/**
 * @openapi
 * /api/v1/houses:
 *   post:
 *     description: "Creates a house listing (requires to be logged-in as a renter)."
 *     tags:
 *       - "Houses"
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
 * 
*/
export async function POST({ request, locals }) {
    //* Authenticated as a renter.
    if (locals.user?.role !== "renter") return actionResult('error', "Only renters can create houses. Please login.", 401);

    //* Got form data in the request.
    const formData = await getRequestFormData(request);
    if (formData === null) return actionResult('error', "The request formData is invalid. Please check your data and try again.", 400);

    //* Validate the form data.
    const form = await superValidate(formData, houseSchemas.post);
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
 *     description: "Gets all house listings."
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
 *                     example: "BAHARİYE ERASMUS HOUSE"
 *                   region:
 *                     type: "string"
 *                     example: "KADIKÖY"
 *                   district:
 *                     type: "string"
 *                     example: "OSMANAĞA"
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
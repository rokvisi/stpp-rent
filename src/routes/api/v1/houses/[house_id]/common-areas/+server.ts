import { pgCommonAreas, pgHouses } from "$lib/database/schema";
import db from "$lib/server/db";
import { getRequestFormData } from "$lib/server/helpers";
import { commonAreaSchemas } from "$lib/zod_schemas.js";
import { error, json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { actionResult, superValidate } from "sveltekit-superforms/server";

/**
 * @openapi
 * /api/v1/houses/{house_id}/common-areas:
 *   post:
 *     description: "Creates a common area for a house."
 *     tags:
 *       - "Common Areas by {house_id}"
 *     parameters:
 *       - in: "path"
 *         name: "house_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The house ID."
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: "object"
 *             required:
 *               - "name"
 *             properties:
 *               name:
 *                 type: "string"
 *                 example: "Kitchen"
 *     responses:
 *       200:
 *         description: "Successfully created a common area for the house!"
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 type:
 *                   type: "string"
 *                   default: "success"
 *                 status:
 *                   type: "number"
 *                   default: 200
 *                 data:
 *                   type: "string"
 *                   example: "*omitted*"
 *       400:
 *         description: "The request formData is invalid. Please check your data and try again."
 *       401:
 *         description: "User not logged-in or the specified house was created by a different renter."
 *       404:
 *         description: "The specified house does not exist."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function POST({ request, locals, params }) {
    //* Authenticated as a renter.
    if (locals.user?.role !== "renter") return actionResult('error', "Only renters can create common areas. Please login.", 401);

    //* Got form data in the request.
    const formData = await getRequestFormData(request);
    if (formData === null) return actionResult('error', "The request formData is invalid. Please check your data and try again.", 400);

    //* Validate the form data.
    const form = await superValidate(formData, commonAreaSchemas.post);
    if (!form.valid) return actionResult('failure', { form }, 400);

    //* Check if the specified house exists.
    const houseId = Number(params.house_id) ?? -1;
    const dbHouse = await getHouseById(houseId);
    if (dbHouse === undefined) return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);
    if (dbHouse === null) return actionResult('error', 'The specified house does not exist.', 404);

    //* Check if the user is the one that created the room and house.
    if (dbHouse.fk_renter !== locals.user.id) return actionResult('error', "The specified house was created by a different renter.", 401);

    //* Insert the note into the database.
    try {
        await db.insert(pgCommonAreas).values({
            ...form.data,
            fk_house: houseId
        })
    }
    catch {
        return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);
    }

    return actionResult('success', { form }, 200);
}

/**
 * @openapi
 * /api/v1/houses/{house_id}/common-areas:
 *   get:
 *     description: "Gets all common areas of the house."
 *     tags:
 *       - "Common Areas by {house_id}"
 *     parameters:
 *       - in: "path"
 *         name: "house_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The house ID."
 *       - in: "query"
 *         name: "offset"
 *         description: "The number of notes to skip."
 *         schema:
 *           type: "integer"
 *           default: 0
 *       - in: "query"
 *         name: "limit"
 *         description: "The numbers of notes to return."
 *         schema:
 *           type: "integer"
 *           default: 10
 *     responses:
 *       200:
 *         description: "Returns a list of common areas in a house."
 *         content:
 *           application/json:
 *             schema:
 *               type: "array"
 *               items:
 *                 type: "object"
 *                 properties:
 *                   id:
 *                     type: "number"
 *                     example: 1
 *                   name:
 *                     type: "string"
 *                     example: "Kitchen"
 *       404:
 *         description: "The specified house has no common areas."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function GET({ params, url }) {
    const houseId = Number(params.house_id) ?? -1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const offset = Number(url.searchParams.get('offset')) || 0;

    const dbCommonAreas = await getCommonAreasByHouseId(houseId, limit, offset);
    if (dbCommonAreas === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    if (dbCommonAreas.length === 0) throw error(404, 'The specified house has no common areas.');

    return json(dbCommonAreas);
}


async function getCommonAreasByHouseId(houseId: number, limit: number, offset: number) {
    try {
        return await db.query.pgCommonAreas.findMany({
            where: eq(pgCommonAreas.fk_house, houseId),
            columns: {
                id: true,
                name: true
            },
            limit,
            offset
        });
    }
    catch {
        return undefined;
    }
}

async function getHouseById(houseId: number) {
    try {
        const res = await db.query.pgHouses.findFirst({
            where: eq(pgHouses.id, houseId),
            columns: {
                fk_renter: true
            }
        });

        if (res === undefined) return null;
        return res;
    }
    catch {
        return undefined;
    }
}
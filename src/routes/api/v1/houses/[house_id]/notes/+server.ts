import { pgHouseLocationNotes, pgHouses } from "$lib/database/schema";
import db from "$lib/server/db";
import { getRequestFormData } from "$lib/server/helpers";
import { houseNoteSchemas } from "$lib/zod_schemas";
import { error, json } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";
import { actionResult, superValidate } from "sveltekit-superforms/server";

/**
 * @openapi
 * /api/v1/houses/{house_id}/notes:
 *   post:
 *     description: "Creates a note for a house."
 *     tags:
 *       - "House Notes by {house_id}"
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
 *               - "note"
 *             properties:
 *               note:
 *                 type: "string"
 *                 example: "The front door doesn't work."
 *     responses:
 *       200:
 *         description: "Successfully created a note for the house!"
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
    if (locals.user?.role !== "renter") return actionResult('error', "Only renters can create house notes. Please login.", 401);

    //* Got form data in the request.
    const formData = await getRequestFormData(request);
    if (formData === null) return actionResult('error', "The request formData is invalid. Please check your data and try again.", 400);

    //* Validate the form data.
    const form = await superValidate(formData, houseNoteSchemas.post);
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
        await db.insert(pgHouseLocationNotes).values({
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
 * /api/v1/houses/{house_id}/notes:
 *   get:
 *     description: "Gets all notes of the house."
 *     tags:
 *       - "House Notes by {house_id}"
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
 *         description: "Returns a list of notes in a house."
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
 *                   note:
 *                     type: "string"
 *                     example: "The front door doesn't work."
 *       404:
 *         description: "The specified house has no notes."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function GET({ params, url }) {
    const houseId = Number(params.house_id) ?? -1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const offset = Number(url.searchParams.get('offset')) || 0;

    const dbNotes = await getNotesByHouseId(houseId, limit, offset);
    if (dbNotes === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    if (dbNotes.length === 0) throw error(404, 'The specified house has no notes.');

    return json(dbNotes);
}



async function getNotesByHouseId(houseId: number, limit: number, offset: number) {
    try {
        return await db.query.pgHouseLocationNotes.findMany({
            where: eq(pgHouseLocationNotes.fk_house, houseId),
            columns: {
                id: true,
                note: true,
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
        });

        if (res === undefined) return null;
        return res;
    }
    catch {
        return undefined;
    }
}
import { pgHouseLocationNotes } from "$lib/database/schema";
import db from "$lib/server/db";
import { getRequestFormData } from "$lib/server/helpers";
import { houseNoteSchemas } from "$lib/zod_schemas";
import { error, json } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";
import { actionResult, superValidate } from "sveltekit-superforms/server";
import type { z } from "zod";

/**
 * @openapi
 * /api/v1/houses/{house_id}/notes/{note_id}:
 *   get:
 *     description: "Gets a note of a house."
 *     tags:
 *       - "House Notes by {house_id}"
 *     parameters:
 *       - in: "path"
 *         name: "house_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The house ID."
 *       - in: "path"
 *         name: "note_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The note ID."
 *     responses:
 *       200:
 *         description: "Gets a note of a house."
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 id:
 *                   type: "number"
 *                   example: 1
 *                 note:
 *                   type: "string"
 *                   example: "The front door doesn't work."
 *       404:
 *         description: "The note with the specified id does not exist in the house."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function GET({ params }) {
    const houseId = Number(params.house_id) ?? -1;
    const noteId = Number(params.note_id) ?? -1;

    const dbNote = await getNoteByIdAndHouseId(houseId, noteId);
    if (dbNote === null) throw error(404, "The note with the specified id does not exist in the house.");
    if (dbNote === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    return json({ ...dbNote, house: undefined })
}

/**
 * @openapi
 * /api/v1/houses/{house_id}/notes/{note_id}:
 *   patch:
 *     description: "Updates a note of a house. (requires to be logged-in as a renter)"
 *     tags:
 *       - "House Notes by {house_id}"
 *     parameters:
 *       - in: "path"
 *         name: "house_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The house ID."
 *       - in: "path"
 *         name: "note_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The note ID."
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
 *         description: "Updated a note of a house."
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
 *                   default: "*omitted*"
 *       400:
 *         description: "The request formData is invalid. Please check your data and try again."
 *       401:
 *         description: "User not logged-in or the specified note of the house was created by a different renter."
 *       404:
 *         description: "The note with the specified id does not exist in the house."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function PATCH({ request, params, locals }) {
    //* Authenticated as a renter.
    if (locals.user?.role !== "renter") return actionResult('error', "Only renters can update rooms. Please login.", 401);

    //* Got form data in the request.
    const formData = await getRequestFormData(request);
    if (formData === null) return actionResult('error', "The request formData is invalid. Please check your data and try again.", 400);

    //* Validate the form data.
    const form = await superValidate(formData, houseNoteSchemas.patch);
    if (!form.valid) return actionResult('failure', { form }, 400);

    //* Find the note.
    const houseId = Number(params.house_id) ?? -1;
    const noteId = Number(params.note_id) ?? -1;
    const dbNote = await getNoteByIdAndHouseId(houseId, noteId);

    if (dbNote === null) throw error(404, "The note with the specified id does not exist in the house.");
    if (dbNote === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    //* Check if the logged-in user is the one that created it.
    if (dbNote.house.fk_renter !== locals.user.id) throw error(401, "The specified note of the house was created by a different renter.");

    const updateResult = await updateNoteWithHouseId(houseId, noteId, form.data);
    if (updateResult === false) return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);

    return actionResult('success', { form }, 200);
}

/**
 * @openapi
 * /api/v1/houses/{house_id}/notes/{note_id}:
 *   delete:
 *     description: "Deletes a note of a house. (requires to be logged-in as a renter)"
 *     tags:
 *       - "House Notes by {house_id}"
 *     parameters:
 *       - in: "path"
 *         name: "house_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The house ID."
 *       - in: "path"
 *         name: "note_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The note ID."
 *     responses:
 *       200:
 *         description: "Deleted the note of the house."
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 message:
 *                   type: "string"
 *                   default: "Successfully deleted the note of the house."
 *       401:
 *         description: "User not logged-in or the specified note of the house was created by a different renter."
 *       404:
 *         description: "The note with the specified id does not exist in the house."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function DELETE({ locals, params }) {
    //* Authenticated as a renter.
    if (locals.user?.role !== "renter") throw error(401, "Only renters can delete room notes. Please login.");

    //* Find the note.
    const houseId = Number(params.house_id) ?? -1;
    const noteId = Number(params.note_id) ?? -1;
    const dbNote = await getNoteByIdAndHouseId(houseId, noteId);

    if (dbNote === null) throw error(404, "The note with the specified id does not exist in the house.");
    if (dbNote === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    //* Check if the logged-in user is the one that created it.
    if (dbNote.house.fk_renter !== locals.user.id) throw error(401, "The specified note of the house was created by a different renter.");

    //* Delete the note.
    try {
        await db.delete(pgHouseLocationNotes).where(and(eq(pgHouseLocationNotes.id, noteId), eq(pgHouseLocationNotes.fk_house, houseId)));
    }
    catch {
        throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    }

    return json({
        message: "Successfully deleted the note of the house."
    });
}

//* ----------------------------------------------
//* ----------------------------------------------

async function getNoteByIdAndHouseId(houseId: number, noteId: number) {
    try {
        const result = await db.query.pgHouseLocationNotes.findFirst({
            where: and(eq(pgHouseLocationNotes.fk_house, houseId), eq(pgHouseLocationNotes.id, noteId)),
            columns: {
                id: true,
                note: true,
            },
            with: {
                house: {
                    columns: {
                        fk_renter: true
                    }
                }
            }
        })

        return result ?? null;
    }
    catch {
        return undefined;
    }
}

async function updateNoteWithHouseId(houseId: number, noteId: number, data: z.infer<typeof houseNoteSchemas.patch>) {
    //* Check if at least 1 updated field exists
    try {
        await db.update(pgHouseLocationNotes).set(data).where(and(eq(pgHouseLocationNotes.id, noteId), eq(pgHouseLocationNotes.fk_house, houseId)));
        return true;
    }
    catch (e) {
        return false;
    }
}
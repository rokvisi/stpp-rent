import { pgRoomNotes } from "$lib/database/schema.js";
import db from "$lib/server/db";
import { getRequestFormData } from "$lib/server/helpers";
import { roomNoteSchemas } from "$lib/zod_schemas.js";
import { error, json } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";
import { actionResult, superValidate } from "sveltekit-superforms/server";
import type { z } from "zod";

/**
 * @openapi
 * /api/v1/houses/{house_id}/rooms/{room_id}/notes/{note_id}:
 *   get:
 *     description: "Gets a note in a room of a house."
 *     tags:
 *       - "Room Notes by {house_id} and {room_id}"
 *     parameters:
 *       - in: "path"
 *         name: "house_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The house ID."
 *       - in: "path"
 *         name: "room_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The room ID."
 *       - in: "path"
 *         name: "note_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The note ID."
 *     responses:
 *       200:
 *         description: "Gets a note in a room of a house."
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
 *                   example: "The lamp doesn't work."
 *       404:
 *         description: "The note with the specified id does not exist in the room of the house."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function GET({ params }) {
    const houseId = Number(params.house_id) ?? -1;
    const roomId = Number(params.room_id) ?? -1;
    const noteId = Number(params.note_id) ?? -1;

    const dbNote = await getNoteByIdAndHouseIdAndRoomId(houseId, roomId, noteId);
    if (dbNote === null) throw error(404, "The note with the specified id does not exist in the room of the house.");
    if (dbNote === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    return json({ ...dbNote, room: undefined })
}

/**
 * @openapi
 * /api/v1/houses/{house_id}/rooms/{room_id}/notes/{note_id}:
 *   patch:
 *     description: "Updates a note in a room of a house. (requires to be logged-in as a renter)"
 *     tags:
 *       - "Room Notes by {house_id} and {room_id}"
 *     parameters:
 *       - in: "path"
 *         name: "house_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The house ID."
 *       - in: "path"
 *         name: "room_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The room ID."
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
 *                 example: "The lamp doesn't work."
 *     responses:
 *       200:
 *         description: "Updated a note in a room of a house."
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
 *         description: "User not logged-in or the specified note in a room of a house was created by a different renter."
 *       404:
 *         description: "The note with the specified id does not exist in the room of the the house."
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
    const form = await superValidate(formData, roomNoteSchemas.patch);
    if (!form.valid) return actionResult('failure', { form }, 400);

    //* Find the note.
    const houseId = Number(params.house_id) ?? -1;
    const roomId = Number(params.room_id) ?? -1;
    const noteId = Number(params.note_id) ?? -1;
    const dbNote = await getNoteByIdAndHouseIdAndRoomId(houseId, roomId, noteId);
    if (dbNote === null) return actionResult('error', "The note with the specified id does not exist in the room of the the house.", 404);
    if (dbNote === undefined) return actionResult('error', "Sorry, we are currently experiencing technical difficulties. Please try again later.", 503);

    //* Check if the logged-in user is the one that created it.
    if (dbNote.room.house.fk_renter !== locals.user.id) return actionResult('error', "The specified note of the room in the house was created by a different renter.", 401);

    const updateResult = await updateNoteWithHouseIdAndRoomId(noteId, roomId, form.data);
    if (updateResult === false) return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);

    return actionResult('success', { form }, 200);
}

/**
 * @openapi
 * /api/v1/houses/{house_id}/rooms/{room_id}/notes/{note_id}:
 *   delete:
 *     description: "Deletes a note in a room of a house. (requires to be logged-in as a renter)"
 *     tags:
 *       - "Room Notes by {house_id} and {room_id}"
 *     parameters:
 *       - in: "path"
 *         name: "house_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The house ID."
 *       - in: "path"
 *         name: "room_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The room ID."
 *       - in: "path"
 *         name: "note_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The note ID."
 *     responses:
 *       200:
 *         description: "Deleted the note of the room in the house."
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 message:
 *                   type: "string"
 *                   default: "Successfully deleted the note of the room in the house."
 *       401:
 *         description: "User not logged-in or the specified note of the room in the house was created by a different renter."
 *       404:
 *         description: "The note with the specified id does not exist in the room of the the house."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function DELETE({ params, locals }) {
    //* Authenticated as a renter.
    if (locals.user?.role !== "renter") throw error(401, "Only renters can delete rooms. Please login.");

    //* Find the note.
    const houseId = Number(params.house_id) ?? -1;
    const roomId = Number(params.room_id) ?? -1;
    const noteId = Number(params.note_id) ?? -1;
    const dbNote = await getNoteByIdAndHouseIdAndRoomId(houseId, roomId, noteId);
    if (dbNote === null) throw error(404, "The note with the specified id does not exist in the room of the the house.");
    if (dbNote === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    //* Check if the logged-in user is the one that created it.
    if (dbNote.room.house.fk_renter !== locals.user.id) throw error(401, "The specified note of the room in the house was created by a different renter.");

    //* Delete the note.
    try {
        await db.delete(pgRoomNotes).where(and(eq(pgRoomNotes.id, noteId), eq(pgRoomNotes.fk_room, roomId)));
    }
    catch {
        throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    }

    return json({
        message: "Successfully deleted the note of the room in the house."
    });
}

//* ----------------------------------------------
//* ----------------------------------------------

async function getNoteByIdAndHouseIdAndRoomId(houseId: number, roomId: number, noteId: number) {
    try {
        const result = await db.query.pgRoomNotes.findFirst({
            where: and(eq(pgRoomNotes.fk_room, roomId), eq(pgRoomNotes.id, noteId)),
            columns: {
                id: true,
                note: true,
            },
            with: {
                room: {
                    columns: {
                        fk_house: true
                    },
                    with: {
                        house: {
                            columns: {
                                fk_renter: true
                            }
                        }
                    }
                }
            }
        })

        if (result === undefined) return null;
        if (result.room.fk_house !== houseId) return null;

        return result;
    }
    catch {
        return undefined;
    }
}

async function updateNoteWithHouseIdAndRoomId(noteId: number, roomId: number, data: z.infer<typeof roomNoteSchemas.patch>) {
    //* Check if at least 1 updated field exists
    try {
        await db.update(pgRoomNotes).set(data).where(and(eq(pgRoomNotes.id, noteId), eq(pgRoomNotes.fk_room, roomId)));
        return true;
    }
    catch (e) {
        return false;
    }
}
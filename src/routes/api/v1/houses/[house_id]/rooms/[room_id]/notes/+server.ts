import { pgHouses, pgRoomNotes, pgRooms } from "$lib/database/schema.js";
import db from "$lib/server/db";
import { getRequestFormData } from "$lib/server/helpers";
import { roomNoteSchemas } from "$lib/zod_schemas";
import { error, json } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";
import { actionResult, superValidate } from "sveltekit-superforms/server";

/**
 * @openapi
 * /api/v1/houses/{house_id}/rooms/{room_id}/notes:
 *   post:
 *     description: "Creates a note for a room (requires to be logged-in as a renter)."
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
 *         description: "Successfully created a note for the room in the house!"
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
 *         description: "User not logged-in or the specified room was created by a different renter."
 *       404:
 *         description: "The specified room does not exist in the specified house."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function POST({ request, locals, params }) {
    //* Authenticated as a renter.
    if (locals.user?.role !== "renter") return actionResult('error', "Only renters can create room notes. Please login.", 401);

    //* Got form data in the request.
    const formData = await getRequestFormData(request);
    if (formData === null) return actionResult('error', "The request formData is invalid. Please check your data and try again.", 400);

    //* Validate the form data.
    const form = await superValidate(formData, roomNoteSchemas.post);
    if (!form.valid) return actionResult('failure', { form }, 400);

    //* Check if the specified room exists inside the specified house.
    const houseId = Number(params.house_id) ?? -1;
    const roomId = Number(params.room_id) ?? -1;
    const dbRoom = await getRoomByHouseIdAndRoomId(houseId, roomId);
    if (dbRoom === undefined) return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);
    if (dbRoom === null) return actionResult('error', 'The specified room does not exist in the specified house.', 404);

    //* Check if the user is the one that created the room and house.
    if (dbRoom.house.fk_renter !== locals.user.id) return actionResult('error', "The specified room was created by a different renter.", 401);

    //* Insert the note into the database.
    try {
        await db.insert(pgRoomNotes).values({
            ...form.data,
            fk_room: roomId
        })
    }
    catch {
        return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);
    }

    return actionResult('success', { form }, 200);
}

/**
 * @openapi
 * /api/v1/houses/{house_id}/rooms/{room_id}/notes:
 *   get:
 *     description: "Gets all notes of the room."
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
 *         description: "Returns a list of notes in a room."
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
 *                     example: "The lamp doesn't work."
 *       404:
 *         description: "The specified room has no notes."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function GET({ params, url }) {
    const houseId = Number(params.house_id) ?? -1;
    const roomId = Number(params.room_id) ?? -1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const offset = Number(url.searchParams.get('offset')) || 0;

    const dbNotes = await getNotesByHouseIdByRoomId(houseId, roomId, limit, offset);
    if (dbNotes === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    if (dbNotes.length === 0) throw error(404, 'The specified room has no notes.');

    return json(dbNotes);
}

//* ----------------------------------------------
//* ----------------------------------------------

async function getNotesByHouseIdByRoomId(houseId: number, roomId: number, limit: number, offset: number) {
    try {
        const res = await db.query.pgRoomNotes.findMany({
            where: eq(pgRoomNotes.fk_room, roomId),
            columns: {
                id: true,
                note: true,
            },
            with: {
                room: {
                    columns: {
                        fk_house: true,
                    },
                },
            },
            limit,
            offset
        });

        return res.filter(note => note.room.fk_house === houseId).map(note => ({ ...note, room: undefined }));
    }
    catch {
        return undefined;
    }
}

async function getRoomByHouseIdAndRoomId(houseId: number, roomId: number) {
    try {
        const res = await db.query.pgRooms.findFirst({
            where: and(eq(pgRooms.id, roomId), eq(pgRooms.fk_house, houseId)),
            with: {
                house: {
                    columns: {
                        fk_renter: true
                    }
                }
            }
        });

        if (res === undefined) return null;
        return res;
    }
    catch {
        return undefined;
    }
}
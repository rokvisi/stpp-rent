import { pgRooms } from '$lib/database/schema.js';
import db from '$lib/server/db';
import { atLeastOneFieldUpdated, getRequestFormData } from '$lib/server/helpers';
import { roomSchemas } from '$lib/zod_schemas.js';
import { error, json } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { actionResult, superValidate } from 'sveltekit-superforms/server';
import type { z } from 'zod';

async function getRoomByHouseAndRoomId(houseId: number, roomId: number) {
    try {
        const result = await db.query.pgRooms.findFirst({
            where: and(eq(pgRooms.id, roomId), eq(pgRooms.fk_house, houseId)),
            columns: {
                id: true,
                number: true,
                description: true,
                price: true
            }
        })

        return result ?? null;
    }
    catch {
        return undefined;
    }
}

async function getRoomByHouseAndRoomIdWithRenterId(houseId: number, roomId: number) {
    try {
        const result = await db.query.pgRooms.findFirst({
            where: and(eq(pgRooms.id, roomId), eq(pgRooms.fk_house, houseId)),
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

async function updateRoomWithHouseAndRoomId(houseId: number, roomId: number, data: z.infer<typeof roomSchemas.patch>) {
    //* Check if at least 1 updated field exists
    try {
        await db.update(pgRooms).set(data).where(and(eq(pgRooms.id, roomId), eq(pgRooms.fk_house, houseId)));
        return true;
    }
    catch (e) {
        return false;
    }
}

/**
 * @openapi
 * /api/v1/houses/{house_id}/rooms/{room_id}:
 *   get:
 *     description: "Gets a room in a house."
 *     tags:
 *       - "Rooms by {house_id}"
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
 *     responses:
 *       200:
 *         description: "Gets a room in a house."
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 id:
 *                   type: "number"
 *                   example: 1
 *                 number:
 *                   type: "number"
 *                   example: 1
 *                 description:
 *                   type: "string"
 *                   example: "Invoices are included. There is a double bed, wardrobe, desk, chair and lampshade."
 *                 price:
 *                   type: "number"
 *                   example: 325
 *       404:
 *         description: "The room with the specified id does not exist in the house."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function GET({ params }) {
    //TODO: Add more info about the room (available or not, images, maybe?)
    const houseId = Number(params.house_id) ?? -1;
    const roomId = Number(params.room_id) ?? -1;

    const dbRoom = await getRoomByHouseAndRoomId(houseId, roomId);
    if (dbRoom === null) throw error(404, "The room with the specified id does not exist in the house.");
    if (dbRoom === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    return json(dbRoom)
}

/**
 * @openapi
 * /api/v1/houses/{house_id}/rooms/{room_id}:
 *   patch:
 *     description: "Updates a room in a house. (requires to be logged-in as a renter)"
 *     tags:
 *       - "Rooms by {house_id}"
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
 *             properties:
 *               number:
 *                 type: "string"
 *                 example: "1"
 *               price:
 *                 type: "integer"
 *                 example: "325"
 *               description:
 *                 type: "string"
 *                 example: "Invoices are included. There is a double bed, wardrobe, desk, chair and lampshade."
 *     responses:
 *       200:
 *         description: "Updated a room in a house."
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
 *         description: "User not logged-in or the specified room was created by a different renter."
 *       404:
 *         description: "The room with the specified id does not exist in the house."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function PATCH({ request, locals, params }) {
    //* Authenticated as a renter.
    if (locals.user?.role !== "renter") return actionResult('error', "Only renters can update rooms. Please login.", 401);

    //* Got form data in the request.
    const formData = await getRequestFormData(request);
    if (formData === null) return actionResult('error', "The request formData is invalid. Please check your data and try again.", 400);

    //* Validate the form data.
    const form = await superValidate(formData, roomSchemas.patch);
    if (!form.valid) return actionResult('failure', { form }, 400);

    //* Find the room.
    const houseId = Number(params.house_id) ?? -1;
    const roomId = Number(params.room_id) ?? -1;
    const dbRoom = await getRoomByHouseAndRoomIdWithRenterId(houseId, roomId);
    if (dbRoom === null) return actionResult("error", "The room with the specified id does not exist in the house.", 404);
    if (dbRoom === undefined) return actionResult("error", 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);

    //* Check if the logged-in user is the one that created it.
    if (dbRoom.house.fk_renter !== locals.user.id) return actionResult("error", "The specified room was created by a different renter.", 401);

    //* Update the room with the new information.
    if (atLeastOneFieldUpdated(form.data) === false) return actionResult('error', "The request formData is invalid. Please check your data and try again.", 400);

    const updateResult = await updateRoomWithHouseAndRoomId(houseId, roomId, form.data);
    if (updateResult === false) return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);

    return actionResult('success', { form }, 200);
}

/**
 * @openapi
 * /api/v1/houses/{house_id}/rooms/{room_id}:
 *   delete:
 *     description: "Deletes a room in a house. (requires to be logged-in as a renter)"
 *     tags:
 *       - "Rooms by {house_id}"
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
 *     responses:
 *       200:
 *         description: "Deleted a room in a house."
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 message:
 *                   type: "string"
 *                   default: "Successfully deleted the room listing."
 *       401:
 *         description: "User not logged-in or the specified room was created by a different renter."
 *       404:
 *         description: "The room with the specified id does not exist in the house."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function DELETE({ params, locals }) {
    //* Authenticated as a renter.
    if (locals.user?.role !== "renter") throw error(401, "Only renters can delete rooms. Please login.");

    //* Find the room
    const houseId = Number(params.house_id) ?? -1;
    const roomId = Number(params.room_id) ?? -1;
    const dbRoom = await getRoomByHouseAndRoomIdWithRenterId(houseId, roomId);
    if (dbRoom === null) throw error(404, "The room with the specified id does not exist in the house.");
    if (dbRoom === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    //* Check if the logged-in user is the one that created it.
    if (dbRoom.house.fk_renter !== locals.user.id) throw error(401, "The specified room was created by a different renter.");

    //* Delete the listing.
    try {
        await db.delete(pgRooms).where(and(eq(pgRooms.id, roomId), eq(pgRooms.fk_house, houseId)));
    }
    catch {
        throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    }

    return json({
        message: "Successfully deleted the room listing."
    });
}
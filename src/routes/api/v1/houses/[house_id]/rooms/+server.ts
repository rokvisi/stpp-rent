import { pgHouses, pgRooms } from "$lib/database/schema";
import db from "$lib/server/db";
import { getRequestFormData } from "$lib/server/helpers";
import { roomSchemas } from "$lib/zod_schemas";
import { error, json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { actionResult, superValidate } from "sveltekit-superforms/server";

async function getRoomsByHouseID(houseId: number, limit: number, offset: number) {
    try {
        return await db.query.pgRooms.findMany({
            columns: {
                id: true,
                number: true,
                description: true,
                price: true,
            },
            where: eq(pgRooms.fk_house, houseId),
            limit,
            offset
        })
    }
    catch {
        return undefined;
    }
}

async function getHouseById(houseId: number) {
    try {
        const res = await db.query.pgHouses.findFirst({
            where: eq(pgHouses.id, houseId)
        })

        if (res === undefined) return null;
        return res;
    }
    catch {
        return undefined;
    }
}

/**
 * @openapi
 * /api/v1/houses/{house_id}/rooms:
 *   post:
 *     description: "Creates a room listing in a house (requires to be logged-in as a renter)."
 *     tags:
 *       - "Rooms by house id"
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
 *               - "number"
 *               - "price"
 *               - "description"
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
 *         description: "Successfully created listing!"
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
 *         description: "The specified house does not exist."
 *       409:
 *         description: "The requested room number is already taken. Please choose a different room number."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function POST({ request, locals, params }) {
    //* Authenticated as a renter.
    if (locals.user?.role !== "renter") return actionResult('error', "Only renters can create rooms. Please login.", 401);

    //* Got form data in the request.
    const formData = await getRequestFormData(request);
    if (formData === null) return actionResult('error', "The request formData is invalid. Please check your data and try again.", 400);

    //* Validate the form data.
    const form = await superValidate(formData, roomSchemas.post);
    if (!form.valid) return actionResult('failure', { form }, 400);

    //* Check if the specified house exists.
    const houseId = Number(params.house_id) ?? -1;
    const dbHouse = await getHouseById(houseId);
    if (dbHouse === undefined) return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);
    if (dbHouse === null) return actionResult('error', 'The specified house does not exist.', 404);

    //* Check if the user is the one that created the house.
    if (dbHouse.fk_renter !== locals.user.id) return actionResult('error', "The specified room was created by a different renter.", 401);

    //* Insert the room into the database.
    try {
        await db.insert(pgRooms).values({
            ...form.data,
            fk_house: houseId
        })
    }
    catch (e) {
        //? Room number already in-use.
        if (e instanceof Error && e.message.includes("duplicate key")) {
            return actionResult(
                "error",
                'The requested room number is already taken. Please choose a different room number.',
                409
            );
        }

        //? Generic database error.
        return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);
    }

    return actionResult('success', { form }, 200);
}

/**
 * @openapi
 * /api/v1/houses/{house_id}/rooms:
 *   get:
 *     description: "Gets all rooms in the house."
 *     tags:
 *       - "Rooms by house id"
 *     parameters:
 *       - in: "path"
 *         name: "house_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The house ID."
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
 *     responses:
 *       200:
 *         description: "Returns a list of rooms in a house."
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
 *                   number:
 *                     type: "number"
 *                     example: 1
 *                   description:
 *                     type: "string"
 *                     example: "Invoices are included. There is a double bed, wardrobe, desk, chair and lampshade."
 *                   price:
 *                     type: "number"
 *                     example: 325
 *       404:
 *         description: "The specified house has no rooms."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function GET({ params, url }) {
    const houseId = Number(params.house_id) ?? -1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const offset = Number(url.searchParams.get('offset')) || 0;

    const dbRooms = await getRoomsByHouseID(houseId, limit, offset);
    if (dbRooms === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    if (dbRooms.length === 0) throw error(404, 'The specified house has no rooms.');

    return json(dbRooms);
}
import { pgContracts, pgRooms } from '$lib/database/schema.js';
import db from '$lib/server/db.js';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function POST({ request, locals }) {
    //* Authenticated as a rentee.
    if (locals.user?.role !== "rentee") throw error(401, "Only rentees can reserve rooms!");

    //* Got form data in the request.
    const json = await request.json();
    if (json.roomId === undefined) throw error(400, "The request json is invalid. Please check your data and try again.");
    const roomId = json.roomId as number;

    //* Get room from the database
    const dbRoom = await getRoomById(roomId);
    if (dbRoom === null) throw error(404, "The room with the specified id does not exist.");
    if (dbRoom === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    //* Check if the room is not already rented out to a user.
    // if (dbRoom.contracts.length !== 0) throw error(403, "The room is already rented out!");

    const activeRentContracts = dbRoom.contracts.filter(r => r.start_date !== null && r.end_date === null)
    const pendingRentContracts = dbRoom.contracts.filter(r => r.start_date === null && r.end_date === null && r.declined === false)

    if (activeRentContracts.length !== 0) {
        throw error(403, "The room is already rented out!");
    }

    if (pendingRentContracts.findIndex(c => c.fk_rentee === locals.user?.id) !== -1) {
        throw error(403, "You have already submitted a reservation request for this room!");
    }

    //* Create the contract
    await createContractRequestForRoom(roomId, locals.user.id);

    return new Response();
}

async function getRoomById(roomId: number) {
    try {
        const result = await db.query.pgRooms.findFirst({
            where: eq(pgRooms.id, roomId),
            with: {
                // contracts: {
                //     where: (contracts, { isNotNull, isNull, and }) => and(isNotNull(contracts.start_date), isNull(contracts.end_date)),
                // },
                contracts: true
            }
        });

        return result ?? null;
    }
    catch {
        return undefined;
    }
}

async function createContractRequestForRoom(roomId: number, renteeId: number) {
    try {
        await db.insert(pgContracts).values({
            fk_room: roomId,
            fk_rentee: renteeId,
        })
    }
    catch {
        throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    }
}
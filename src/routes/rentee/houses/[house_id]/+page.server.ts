import { pgHouses } from '$lib/database/schema.js'
import db from '$lib/server/db'
import { error } from '@sveltejs/kit';
import { eq, } from 'drizzle-orm'

export async function load({ params, locals }) {
    const houseId = parseInt(params.house_id);

    //* Try to find the house in the database.
    const dbHouse = await db.query.pgHouses.findFirst({
        where: eq(pgHouses.id, houseId),
        with: {
            houseLocationNotes: true,
            rooms: {
                with: {
                    images: true,
                    notes: true,
                    contracts: {
                        where: (contracts, { isNotNull, isNull, and }) => and(isNotNull(contracts.start_date), isNull(contracts.end_date)),
                    }
                }
            },
            commonAreas: {
                with: {
                    images: true,
                }
            },
        }
    });

    //* If no house was found - throw 404.
    if (dbHouse === undefined) throw error(404);

    //* Data cleanup
    dbHouse.rooms.sort((r1, r2) => r1.number - r2.number);

    return {
        house: dbHouse,
    }
}
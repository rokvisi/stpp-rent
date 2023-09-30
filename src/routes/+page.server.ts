import db from "$lib/server/database/db";

export async function load() {
    const houses = await db.query.pgHouses.findMany({
        with: {
            renter: {
                columns: {
                    username: true
                }
            }
        },
    });

    return {
        houses
    }
}
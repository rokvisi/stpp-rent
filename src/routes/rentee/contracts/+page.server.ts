import db from "$lib/server/db";
import { error } from "@sveltejs/kit";

export async function load({ locals }) {
    if (locals.user === undefined) throw error(401);
    const renteeId = locals.user.id

    const cons = await db.query.pgContracts.findMany({
        where: (contracts, { isNotNull, isNull, and, eq }) => eq(contracts.fk_rentee, renteeId),
        with: {
            room: {
                with: {
                    images: true,
                    house: true
                },
            },

        }
    })

    const pendingContracts = cons.filter(
        (c) => c.declined === false && c.start_date === null && c.end_date === null
    );
    const activeContracts = cons.filter(
        (c) => c.declined === false && c.start_date !== null && c.end_date === null
    );
    const declinedContracts = cons.filter((c) => c.declined === true);
    const completedContracts = cons.filter(
        (c) => c.declined === false && c.end_date !== null && c.end_date !== null
    );

    return {
        pendingContracts,
        activeContracts,
        declinedContracts,
        completedContracts
    }
}
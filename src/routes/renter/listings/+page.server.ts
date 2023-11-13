import { pgHouses, type House } from "$lib/database/schema.js";
import db from "$lib/server/db";
import { eq } from "drizzle-orm";

export async function load({ locals }) {
    const houses: House[] = await db.query.pgHouses.findMany({
        where: eq(pgHouses.fk_renter, locals.user?.id ?? -1),
    })

    return {
        houses
    }
}
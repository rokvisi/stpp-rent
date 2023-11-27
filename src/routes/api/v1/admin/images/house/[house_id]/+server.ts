import { pgRoomImages, pgCommonAreaImages, pgHouses } from "$lib/database/schema.js";
import db from "$lib/server/db";
import { deleteImageFromVercel } from "$lib/server/helpers";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function DELETE({ locals, params }) {
    return new Response();

    //* Authenticated as an admin.
    if (locals.user?.role !== "admin") throw error(401, "Only admins can delete images with this endpoint. Please login.");

    //* Get the room of the image
    const houseId = Number(params.house_id) ?? -1;
    const dbHouse = await getHouseById(houseId);
    if (dbHouse === null) throw error(404, "The room image with the specified id does not exist.");
    if (dbHouse === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    //* Delete the image form vercel.
    const successDeletingFromVercel = await deleteImageFromVercel(dbHouse.image_url);
    if (!successDeletingFromVercel) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    //* Delete the image from db.
    try {
        await db.update(pgHouses).set({
            image_url: ""
        }).where(eq(pgHouses.id, houseId))
    }
    catch {
        throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    }

    return new Response();
}

async function getHouseById(houseId: number) {
    try {
        const result = await db.query.pgHouses.findFirst({
            where(fields, operators) {
                return operators.eq(fields.id, houseId)
            },
            columns: {
                image_url: true
            }
        })
        return result ?? null;
    }
    catch {
        return undefined;
    }
}
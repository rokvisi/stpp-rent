import { pgRoomImages } from "$lib/database/schema.js";
import db from "$lib/server/db";
import { deleteImageFromVercel } from "$lib/server/helpers";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function DELETE({ locals, params }) {
    return new Response();

    //* Authenticated as an admin.
    if (locals.user?.role !== "admin") throw error(401, "Only admins can delete images with this endpoint. Please login.");

    //* Get the room of the image
    const imageId = Number(params.image_id) ?? -1;
    const dbRoomImage = await getRoomImageById(imageId);
    if (dbRoomImage === null) throw error(404, "The room image with the specified id does not exist.");
    if (dbRoomImage === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    //* Delete the image form vercel.
    const successDeletingFromVercel = await deleteImageFromVercel(dbRoomImage.url);
    if (!successDeletingFromVercel) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    //* Delete the image from db.
    try {
        await db.delete(pgRoomImages).where(eq(pgRoomImages.id, imageId))
    }
    catch {
        throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    }

    return new Response();
}

async function getRoomImageById(imageId: number) {
    try {
        const result = await db.query.pgRoomImages.findFirst({
            where(fields, operators) {
                return operators.eq(fields.id, imageId)
            },
        })
        return result ?? null;
    }
    catch {
        return undefined;
    }
}
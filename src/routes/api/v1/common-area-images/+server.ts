import { pgCommonAreaImages, pgRoomImages } from "$lib/database/schema.js";
import db from "$lib/server/db";
import { deleteImageFromVercel } from "$lib/server/helpers";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function DELETE({ request, locals }) {
    //* Authenticated as a renter.
    if (locals.user?.role !== "renter") throw error(401, "Only renters can update common areas. Please login.");

    //* Got form data in the request.
    const json = await request.json();
    if (json.image_id === undefined) throw error(400, "The request json is invalid. Please check your data and try again.");

    //* Get the room of the image
    const imageId = json.image_id;
    const dbCommonAreaImage = await getCommonAreaImageById(imageId);
    if (dbCommonAreaImage === null) throw error(404, "The common area image with the specified id does not exist.");
    if (dbCommonAreaImage === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    //* Check if the logged-in user is the one that created the image.
    if (dbCommonAreaImage.commonArea.house.fk_renter !== locals.user.id) throw error(401, "The specified house was created by a different renter.");

    //* Delete the image form vercel.
    const successDeletingFromVercel = await deleteImageFromVercel(dbCommonAreaImage.url);
    if (!successDeletingFromVercel) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    //* Delete the image from db.
    try {
        await db.delete(pgCommonAreaImages).where(eq(pgCommonAreaImages.id, imageId))
    }
    catch {
        throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    }

    return new Response();
}

async function getCommonAreaImageById(imageId: number) {
    try {
        const result = await db.query.pgCommonAreaImages.findFirst({
            where(fields, operators) {
                return operators.eq(fields.id, imageId)
            },
            with: {
                commonArea: {
                    columns: {},
                    with: {
                        house: {
                            columns: { fk_renter: true }
                        }
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
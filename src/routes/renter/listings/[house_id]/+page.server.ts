import { pgHouses, type House } from '$lib/database/schema.js'
import db from '$lib/server/db'
import { error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm'
import { houseSchemas } from '$lib/zod_schemas';
import { superValidate, actionResult, message } from 'sveltekit-superforms/server';
import { atLeastOneFieldUpdated, getRequestFormData, updateImageOrNothing } from '$lib/server/helpers';
import type { z } from 'zod';


export async function load({ params, locals }) {
    const houseId = parseInt(params.house_id);

    //* Try to find the house in the database.
    const dbHouse = await db.query.pgHouses.findFirst({
        where: eq(pgHouses.id, houseId),
        with: {
            houseLocationNotes: true,
            rooms: {
                with: {
                    images: {
                        columns: {
                            url: true
                        },
                        limit: 1,
                    }
                }
            },
            commonAreas: {
                with: {
                    images: {
                        columns: {
                            url: true
                        },
                        limit: 1
                    }
                }
            }
        }
    });

    //* If no house was found - throw 404.
    if (dbHouse === undefined) throw error(404);

    //* Check if the logged-in user is the one that created the house.
    if (dbHouse.fk_renter !== locals.user!.id) throw error(401, "The specified house was created by a different renter.");

    //* Data cleanup
    dbHouse.rooms.sort((r1, r2) => r1.number - r2.number);

    return {
        house: dbHouse,
        patchHouseForm: await superValidate({
            name: dbHouse.name,
            region: dbHouse.region,
            district: dbHouse.district,
            location_description: dbHouse.location_description,
            wifi_speed: dbHouse.wifi_speed ?? 0
        }, houseSchemas.patch)
    }
}

export const actions = {
    patchHouseData: async ({ fetch, request, params, locals }) => {
        //* Authenticated as a renter.
        if (locals.user?.role !== "renter") throw error(401, "Only renters can update houses. Please login.");

        //* Got form data in the request.
        const formData = await getRequestFormData(request);
        if (formData === null) throw error(400, "The request formData is invalid. Please check your data and try again.");

        //* Validate the form data.
        const form = await superValidate(formData, houseSchemas.patch);
        if (!form.valid) return fail(400, { form });

        //* Find the house
        const houseId = Number(params.house_id) ?? -1;
        const dbHouse = await getHouseByIdPartial(houseId);
        if (dbHouse === null) return message(form, "The house with the specified id does not exist.", { status: 404 });
        if (dbHouse === undefined) return message(form, 'Sorry, we are currently experiencing technical difficulties. Please try again later.', { status: 503 });

        //* Check if the logged-in user is the one that created it.
        if (dbHouse.fk_renter !== locals.user.id) return message(form, "The specified house was created by a different renter.", { status: 401 });

        //* Upload the new image and delete the old one if provided.
        let image = formData.get("image") as File | null;
        if (image !== null && image.size === 0) image = null;
        const newImageUrl = await updateImageOrNothing(dbHouse.image_url, image);

        //* Update the house with the new information.
        const updateData = { ...form.data, image_url: newImageUrl ?? undefined };
        if (atLeastOneFieldUpdated(updateData) === false) return message(form, "The request formData is invalid. Please check your data and try again.", { status: 400 });

        const updateResult = await updateHouseWithId(houseId, updateData);
        if (updateResult === false) return message(form, 'Sorry, we are currently experiencing technical difficulties. Please try again later.', { status: 503 });

        //* Success
        return { form };
    },
};

async function getHouseByIdPartial(id: number) {
    try {
        const result = await db.query.pgHouses.findFirst({
            where(fields, operators) {
                return operators.eq(fields.id, id)
            },
            columns: {
                fk_renter: true,
                image_url: true
            }
        })
        return result ?? null;
    }
    catch {
        return undefined;
    }
}

async function updateHouseWithId(id: number, data: z.infer<typeof houseSchemas.patch> & { image_url?: string | undefined }) {
    //* Check if at least 1 updated field exists
    try {
        await db.update(pgHouses).set(data).where(eq(pgHouses.id, id));
        return true;
    }
    catch (e) {
        return false;
    }
}
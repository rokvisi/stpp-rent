import db from '$lib/server/db.js'
import { z } from 'zod';
import { pgCommonAreaImages, pgCommonAreas, pgRoomImages, pgRooms } from '$lib/database/schema.js'
import { atLeastOneFieldUpdated, getRequestFormData, updateImageOrNothing, uploadImageToVercel } from '$lib/server/helpers';
import { commonAreaSchemas, roomSchemas } from '$lib/zod_schemas';
import { error, fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm'
import { message, superValidate } from 'sveltekit-superforms/server';

export async function load({ params }) {
    const dbCommonArea = await db.query.pgCommonAreas.findFirst({
        where: eq(pgCommonAreas.id, parseInt(params.area_id)),
        with: {
            images: true,
        }
    })
    if (dbCommonArea === undefined) throw error(404);

    return {
        area: dbCommonArea,
        patchAreaForm: await superValidate({
            name: dbCommonArea.name,
        }, commonAreaSchemas.patch),
        uploadImageForm: await superValidate(z.object({}))
    }
}

export const actions = {
    patchArea: async ({ locals, params, request }) => {
        //* Authenticated as a renter.
        if (locals.user?.role !== "renter") throw error(401, "Only renters can update common areas. Please login.");

        //* Got form data in the request.
        const formData = await getRequestFormData(request);
        if (formData === null) throw error(400, "The request formData is invalid. Please check your data and try again.");

        //* Validate the form data.
        const form = await superValidate(formData, commonAreaSchemas.patch);
        if (!form.valid) return fail(400, { form });

        //* Find the common area.
        const houseId = Number(params.house_id) ?? -1;
        const areaId = Number(params.area_id) ?? -1;
        const dbCommonArea = await getCommonAreaByHouseIdAndAreaId(houseId, areaId);

        if (dbCommonArea === null) throw error(404, "The common area with the specified id does not exist in the house.");
        if (dbCommonArea === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

        //* Check if the logged-in user is the one that created it.
        if (dbCommonArea.house.fk_renter !== locals.user.id) throw error(401, "The specified common area of the house was created by a different renter.");

        const updateResult = await updateCommonAreaWithHouseId(houseId, areaId, form.data);
        if (updateResult === false) return message(form, 'Sorry, we are currently experiencing technical difficulties. Please try again later.', { status: 503 });

        //* Success
        return { form };
    },
    uploadImage: async ({ locals, request, params }) => {
        //* Authenticated as a renter.
        if (locals.user?.role !== "renter") throw error(401, "Only renters can update common areas. Please login.");

        //* Got form data in the request.
        const formData = await getRequestFormData(request);
        if (formData === null) throw error(400, "The request formData is invalid. Please check your data and try again.");

        //* Validate the form data.
        const form = await superValidate(formData, z.object({}));
        if (!form.valid) return fail(400, { form });

        //* Get the room
        const dbArea = await getCommonAreaById(parseInt(params.area_id));
        if (dbArea === null) return message(form, "The common area with the specified id does not exist.", { status: 404 });
        if (dbArea === undefined) return message(form, 'Sorry, we are currently experiencing technical difficulties. Please try again later.', { status: 503 });

        //*  Check if the logged in user is the one that created the room.
        if (dbArea.house.fk_renter !== locals.user.id) return message(form, "The specified common area was created by a different renter.", { status: 401 });

        //* Check if the uploaded image is valid.
        let image = formData.get("image") as File | null;
        if (image !== null && image.size === 0) image = null;
        if (image === null) throw error(400, "The request formData is invalid. Please check your data and try again.");

        //* Upload the image and check status.
        const uploadedImageUrl = await uploadImageToVercel(image.name, image);
        if (uploadedImageUrl === null) return message(form, 'Sorry, we are currently experiencing technical difficulties. Please try again later.', { status: 503 });

        //* Add the image to the room images
        try {
            await db.insert(pgCommonAreaImages).values({ url: uploadedImageUrl, fk_common_area: parseInt(params.area_id) })
        }
        catch {
            return message(form, 'Sorry, we are currently experiencing technical difficulties. Please try again later.', { status: 503 });
        }

        return { form };
    }
}

async function getCommonAreaByHouseIdAndAreaId(houseId: number, areaId: number) {
    try {
        const result = await db.query.pgCommonAreas.findFirst({
            where: and(eq(pgCommonAreas.fk_house, houseId), eq(pgCommonAreas.id, areaId)),
            columns: {
                id: true,
                name: true,
            },
            with: {
                house: {
                    columns: {
                        fk_renter: true
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

async function updateCommonAreaWithHouseId(houseId: number, areaId: number, data: z.infer<typeof commonAreaSchemas.patch>) {
    //* Check if at least 1 updated field exists
    try {
        await db.update(pgCommonAreas).set(data).where(and(eq(pgCommonAreas.id, areaId), eq(pgCommonAreas.fk_house, houseId)));
        return true;
    }
    catch (e) {
        return false;
    }
}

async function getCommonAreaById(areaId: number) {
    try {
        const result = await db.query.pgCommonAreas.findFirst({
            where(fields, operators) {
                return operators.eq(fields.id, areaId)
            },
            with: {
                house: {
                    columns: {
                        fk_renter: true
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
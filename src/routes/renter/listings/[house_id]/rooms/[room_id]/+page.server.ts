import { pgRoomImages, pgRooms } from '$lib/database/schema.js'
import db from '$lib/server/db.js'
import { atLeastOneFieldUpdated, getRequestFormData, updateImageOrNothing, uploadImageToVercel } from '$lib/server/helpers';
import { roomSchemas } from '$lib/zod_schemas';
import { error, fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm'
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

export async function load({ params }) {
    const dbRoom = await db.query.pgRooms.findFirst({
        where: eq(pgRooms.id, parseInt(params.room_id)),
        with: {
            images: true,
            notes: true
        }
    })
    if (dbRoom === undefined) throw error(404);

    return {
        room: dbRoom,
        patchRoomForm: await superValidate({
            number: dbRoom.number,
            price: dbRoom.price,
            description: dbRoom.description
        }, roomSchemas.patch),
        uploadImageForm: await superValidate(z.object({}))
    }
}

export const actions = {
    patchRoom: async ({ locals, params, request }) => {
        //* Authenticated as a renter.
        if (locals.user?.role !== "renter") throw error(401, "Only renters can update rooms. Please login.");

        //* Got form data in the request.
        const formData = await getRequestFormData(request);
        if (formData === null) throw error(400, "The request formData is invalid. Please check your data and try again.");

        //* Validate the form data.
        const form = await superValidate(formData, roomSchemas.patch);
        if (!form.valid) return fail(400, { form });

        //* Find the room.
        const houseId = Number(params.house_id) ?? -1;
        const roomId = Number(params.room_id) ?? -1;
        const dbRoom = await getRoomByHouseAndRoomIdWithRenterId(houseId, roomId);
        if (dbRoom === null) return message(form, "The room with the specified id does not exist in the house.", { status: 404 });
        if (dbRoom === undefined) return message(form, 'Sorry, we are currently experiencing technical difficulties. Please try again later.', { status: 503 });

        //* Check if the logged-in user is the one that created it.
        if (dbRoom.house.fk_renter !== locals.user.id) return message(form, "The specified room was created by a different renter.", { status: 401 });

        //* Update the room with the new information.
        if (atLeastOneFieldUpdated(form.data) === false) throw error(400, "The request formData is invalid. Please check your data and try again.");

        const updateResult = await updateRoomWithHouseAndRoomId(houseId, roomId, form.data);
        if (updateResult === false) return message(form, 'Sorry, we are currently experiencing technical difficulties. Please try again later.', { status: 503 });

        //* Success
        return { form };
    },
    uploadImage: async ({ locals, request, params }) => {
        //* Authenticated as a renter.
        if (locals.user?.role !== "renter") throw error(401, "Only renters can update rooms. Please login.");

        //* Got form data in the request.
        const formData = await getRequestFormData(request);
        if (formData === null) throw error(400, "The request formData is invalid. Please check your data and try again.");

        //* Validate the form data.
        const form = await superValidate(formData, z.object({}));
        if (!form.valid) return fail(400, { form });

        //* Get the room
        const dbRoom = await getRoomById(parseInt(params.room_id));
        if (dbRoom === null) return message(form, "The room with the specified id does not exist.", { status: 404 });
        if (dbRoom === undefined) return message(form, 'Sorry, we are currently experiencing technical difficulties. Please try again later.', { status: 503 });

        //*  Check if the logged in user is the one that created the room.
        if (dbRoom.house.fk_renter !== locals.user.id) return message(form, "The specified room was created by a different renter.", { status: 401 });

        //* Check if the uploaded image is valid.
        let image = formData.get("image") as File | null;
        if (image !== null && image.size === 0) image = null;
        if (image === null) throw error(400, "The request formData is invalid. Please check your data and try again.");

        //* Upload the image and check status.
        const uploadedImageUrl = await uploadImageToVercel(image.name, image);
        if (uploadedImageUrl === null) return message(form, 'Sorry, we are currently experiencing technical difficulties. Please try again later.', { status: 503 });

        //* Add the image to the room images
        try {
            await db.insert(pgRoomImages).values({ url: uploadedImageUrl, fk_room: parseInt(params.room_id) })
        }
        catch {
            return message(form, 'Sorry, we are currently experiencing technical difficulties. Please try again later.', { status: 503 });
        }

        return { form };
    }
}

async function getRoomByHouseAndRoomIdWithRenterId(houseId: number, roomId: number) {
    try {
        const result = await db.query.pgRooms.findFirst({
            where: and(eq(pgRooms.id, roomId), eq(pgRooms.fk_house, houseId)),
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

async function updateRoomWithHouseAndRoomId(houseId: number, roomId: number, data: z.infer<typeof roomSchemas.patch>) {
    //* Check if at least 1 updated field exists
    try {
        await db.update(pgRooms).set(data).where(and(eq(pgRooms.id, roomId), eq(pgRooms.fk_house, houseId)));
        return true;
    }
    catch (e) {
        return false;
    }
}

async function getRoomById(roomId: number) {
    try {
        const result = await db.query.pgRooms.findFirst({
            where(fields, operators) {
                return operators.eq(fields.id, roomId)
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
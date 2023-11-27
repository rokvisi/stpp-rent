import { pgCommonAreas, pgHouses, pgRooms } from "$lib/database/schema";
import db from "$lib/server/db";
import { getRequestFormData } from "$lib/server/helpers";
import { commonAreaSchemas, roomSchemas } from "$lib/zod_schemas";
import { error, fail } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { message, superValidate } from "sveltekit-superforms/server";

export async function load({ params }) {
    return {
        postCommonAreaForm: await superValidate(commonAreaSchemas.post)
    }
}

export const actions = {
    createRoom: async ({ request, locals, params }) => {
        //* Authenticated as a renter.
        if (locals.user?.role !== "renter") throw error(401, "Only renters can create common areas. Please login.");

        //* Got form data in the request.
        const formData = await getRequestFormData(request);
        if (formData === null) throw error(400, "The request formData is invalid. Please check your data and try again.");

        //* Validate the form data.
        const form = await superValidate(formData, commonAreaSchemas.post);
        if (!form.valid) return fail(400, { form });

        //* Check if the specified house exists.
        const houseId = Number(params.house_id) ?? -1;
        const dbHouse = await getHouseById(houseId);
        if (dbHouse === null) return message(form, 'The specified house does not exist.', { status: 404 });
        if (dbHouse === undefined) return message(form, 'Sorry, we are currently experiencing technical difficulties. Please try again later.', { status: 503 });

        //* Check if the user is the one that created the house.
        if (dbHouse.fk_renter !== locals.user.id) return message(form, "The specified house was created by a different renter.", { status: 401 });

        //* Insert the room into the database.
        try {
            await db.insert(pgCommonAreas).values({
                ...form.data,
                fk_house: houseId
            })
        }
        catch (e) {
            //? Generic database error.
            return message(form, 'Sorry, we are currently experiencing technical difficulties. Please try again later.', { status: 503 });
        }

        //* Success
        return { form };
    }
}

async function getHouseById(houseId: number) {
    try {
        const res = await db.query.pgHouses.findFirst({
            where: eq(pgHouses.id, houseId)
        })

        if (res === undefined) return null;
        return res;
    }
    catch {
        return undefined;
    }
}
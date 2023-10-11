import { pgCommonAreas } from "$lib/database/schema";
import db from "$lib/server/db";
import { getRequestFormData } from "$lib/server/helpers";
import { commonAreaSchemas } from "$lib/zod_schemas.js";
import { error, json } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";
import { actionResult, superValidate } from "sveltekit-superforms/server";
import type { z } from "zod";

/**
 * @openapi
 * /api/v1/houses/{house_id}/common-areas/{area_id}:
 *   get:
 *     description: "Gets a common area of a house."
 *     tags:
 *       - "Common Areas by {house_id}"
 *     parameters:
 *       - in: "path"
 *         name: "house_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The house ID."
 *       - in: "path"
 *         name: "area_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The common area ID."
 *     responses:
 *       200:
 *         description: "Gets a common area of a house."
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 id:
 *                   type: "number"
 *                   example: 1
 *                 name:
 *                   type: "string"
 *                   example: "Kitchen."
 *       404:
 *         description: "The common area with the specified id does not exist in the house."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function GET({ params }) {
    const houseId = Number(params.house_id) ?? -1;
    const areaId = Number(params.area_id) ?? -1;

    const dbCommonArea = await getCommonAreaByHouseIdAndAreaId(houseId, areaId);
    if (dbCommonArea === null) throw error(404, "The common area with the specified id does not exist in the house.");
    if (dbCommonArea === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    return json({ ...dbCommonArea, house: undefined })
}

/**
 * @openapi
 * /api/v1/houses/{house_id}/common-areas/{area_id}:
 *   patch:
 *     description: "Updates a common area of a house. (requires to be logged-in as a renter)"
 *     tags:
 *       - "Common Areas by {house_id}"
 *     parameters:
 *       - in: "path"
 *         name: "house_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The house ID."
 *       - in: "path"
 *         name: "area_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The common area ID."
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: "object"
 *             required:
 *               - "name"
 *             properties:
 *               name:
 *                 type: "string"
 *                 example: "Kitchen."
 *     responses:
 *       200:
 *         description: "Updated a common area of a house."
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 type:
 *                   type: "string"
 *                   default: "success"
 *                 status:
 *                   type: "number"
 *                   default: 200
 *                 data:
 *                   type: "string"
 *                   default: "*omitted*"
 *       400:
 *         description: "The request formData is invalid. Please check your data and try again."
 *       401:
 *         description: "User not logged-in or the specified common area of the house was created by a different renter."
 *       404:
 *         description: "The common area with the specified id does not exist in the house."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function PATCH({ request, params, locals }) {
    //* Authenticated as a renter.
    if (locals.user?.role !== "renter") return actionResult('error', "Only renters can update common areas. Please login.", 401);

    //* Got form data in the request.
    const formData = await getRequestFormData(request);
    if (formData === null) return actionResult('error', "The request formData is invalid. Please check your data and try again.", 400);

    //* Validate the form data.
    const form = await superValidate(formData, commonAreaSchemas.patch);
    if (!form.valid) return actionResult('failure', { form }, 400);

    //* Find the common area.
    const houseId = Number(params.house_id) ?? -1;
    const areaId = Number(params.area_id) ?? -1;
    const dbCommonArea = await getCommonAreaByHouseIdAndAreaId(houseId, areaId);

    if (dbCommonArea === null) throw error(404, "The common area with the specified id does not exist in the house.");
    if (dbCommonArea === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    //* Check if the logged-in user is the one that created it.
    if (dbCommonArea.house.fk_renter !== locals.user.id) throw error(401, "The specified common area of the house was created by a different renter.");

    const updateResult = await updateCommonAreaWithHouseId(houseId, areaId, form.data);
    if (updateResult === false) return actionResult('error', 'Sorry, we are currently experiencing technical difficulties. Please try again later.', 503);

    return actionResult('success', { form }, 200);
}

/**
 * @openapi
 * /api/v1/houses/{house_id}/common-areas/{area_id}:
 *   delete:
 *     description: "Deletes a common area of a house. (requires to be logged-in as a renter)"
 *     tags:
 *       - "Common Areas by {house_id}"
 *     parameters:
 *       - in: "path"
 *         name: "house_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The house ID."
 *       - in: "path"
 *         name: "area_id"
 *         required: true
 *         schema:
 *           type: "integer"
 *           description: "The common area ID."
 *     responses:
 *       200:
 *         description: "Deleted the common area of the house."
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 message:
 *                   type: "string"
 *                   default: "Successfully deleted the common area of the house."
 *       401:
 *         description: "User not logged-in or the specified common area of the house was created by a different renter."
 *       404:
 *         description: "The common area with the specified id does not exist in the house."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function DELETE({ locals, params }) {
    //* Authenticated as a renter.
    if (locals.user?.role !== "renter") throw error(401, "Only renters can delete common areas. Please login.");

    //* Find the common area.
    const houseId = Number(params.house_id) ?? -1;
    const areaId = Number(params.area_id) ?? -1;
    const dbCommonArea = await getCommonAreaByHouseIdAndAreaId(houseId, areaId);

    if (dbCommonArea === null) throw error(404, "The common area with the specified id does not exist in the house.");
    if (dbCommonArea === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');

    //* Check if the logged-in user is the one that created it.
    if (dbCommonArea.house.fk_renter !== locals.user.id) throw error(401, "The specified common area of the house was created by a different renter.");

    //* Delete the common area.
    try {
        await db.delete(pgCommonAreas).where(and(eq(pgCommonAreas.id, areaId), eq(pgCommonAreas.fk_house, houseId)));
    }
    catch {
        throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    }

    return json({
        message: "Successfully deleted the common area of the house."
    });
}

//* ----------------------------------------------
//* ----------------------------------------------

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
import { pgHouses } from "$lib/database/schema";
import db from "$lib/server/db";
import { houseSchemas } from "$lib/zod_schemas";
import { eq } from "drizzle-orm";
import { superValidate } from "sveltekit-superforms/server";
import type { z } from "zod";

export async function GET() {

    return new Response();
}
import { pgUsers } from '$lib/database/schema';
import db from '$lib/server/db';
import { error, json } from '@sveltejs/kit';

export async function GET() {
	try {
		const result = await db.select().from(pgUsers);
		return json(result);
	} catch {
		throw error(403);
	}
}

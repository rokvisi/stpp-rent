import { insertUserSchema, pgUsers } from '$lib/database/schema.js';
import db from '$lib/server/db.js';

export async function POST({ request }) {
	const requestParaseResult = insertUserSchema.safeParse(await request.json());
	if (!requestParaseResult.success) {
		console.log('/api/users/new | ERROR! Invalid request.');
		return new Response();
	}

	await db.insert(pgUsers).values(requestParaseResult.data);
	console.log('/api/users/new | inserted new user:', requestParaseResult.data);
	return new Response();
}

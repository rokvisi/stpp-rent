import { pgUsers } from '$lib/database/schema';
import db from '$lib/server/database/db';
import { authSchemas } from '$lib/zod_schemas';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
	const requestBody = await request.json();

	try {
		//* 1. Zod validate the formData. (optional, but highly recommeded)
		const { username, password, role } = authSchemas.register.parse(requestBody);

		//* 2. Hash the password for database lookup.
		const passwordHash = Buffer.from(
			await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
		).toString('base64');

		//* 3. Check if the user exists and the password matches.
		const userInfo = await db.query.pgUsers.findFirst({
			where: eq(pgUsers.username, username)
		});

		//* 3.1. If the user already exists - return error response.
		if (userInfo !== undefined) {
			console.log('User already exists!');
			throw error(401); //TODO: Add proper error message.
		}

		//* 4. Create the user.
		await db.insert(pgUsers).values({
			username,
			password: passwordHash,
			role
		});

		//TODO: Log the user in.

		return new Response(); //TODO: Add response.
	} catch (e) {
		throw error(401); //TODO: Add proper error message.
	}
}

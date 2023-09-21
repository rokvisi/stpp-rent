import { pgUsers } from '$lib/database/schema';
import db from '$lib/server/database/db';
import { authSchema } from '$lib/zod_schemas';
import { error } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export async function POST({ request }) {
	const requestBody = await request.json();

	try {
		//* 1. Zod validate the formData. (optional, but highly recommeded)
		const { username, password } = authSchema.parse(requestBody);
		console.log('/auth/login | ZOD VALID:', { username, password });

		//* 2. Hash the password for database lookup.
		const passwordHash = Buffer.from(
			await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
		).toString('base64');
		console.log('Hashed password:', passwordHash);

		//* 3. Check if the user exists and the password matches.
		const userInfo = await db.query.pgUsers.findFirst({
			where: and(eq(pgUsers.name, username), eq(pgUsers.password, passwordHash))
		});

		//* 3.1. If the user already exists - return error response.
		if (userInfo !== undefined) {
			console.log('User already exists!');
			throw error(401); //TODO: Add proper error message.
		}

		//* 4. Create the user.
		await db.insert(pgUsers).values({
			name: username,
			password: passwordHash
		});

		//TODO: Log the user in.

		return new Response(); //TODO: Add response.
	} catch (e) {
		throw error(401); //TODO: Add proper error message.
	}
}

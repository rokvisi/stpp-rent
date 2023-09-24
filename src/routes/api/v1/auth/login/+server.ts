import { authSchemas } from '$lib/zod_schemas.js';
import { error, json, redirect } from '@sveltejs/kit';
import db from '$lib/server/database/db';
import { and, eq } from 'drizzle-orm';
import { pgUsers } from '$lib/database/schema.js';
import { createAndSetAuthCookie, hashPassword } from '$lib/server/auth_helper.js';
import { parseRequestBodyBySchema } from '$lib/server/api_helpers';

async function getUserByCredentials(username: string, passwordHash: string) {
	try {
		return await db.query.pgUsers.findFirst({
			where: and(eq(pgUsers.username, username), eq(pgUsers.password, passwordHash)),
			columns: { username: true, role: true }
		});
	} catch (e) {
		throw error(
			503,
			'Sorry, we are currently experiencing technical difficulties. Please try again later.'
		);
	}
}

export async function POST({ request, cookies }) {
	//* 1. Zod validate the request body.
	const { username, password } = await parseRequestBodyBySchema(
		request,
		authSchemas.login,
		'The data provided in the request body is invalid. Please check your login information and try again.'
	);

	//* 2. Hash the password for database lookup.
	const passwordHash = await hashPassword(password);

	//* 3.1. Check if a user exists with the given credentials.
	const userInfo = await getUserByCredentials(username, passwordHash);

	//* 3.2. If the user doesn't exist or the password doesn't match - return error response.
	if (userInfo === undefined) {
		throw error(401, 'Invalid username or password. Please check your credentials and try again.');
	}

	//* 4. Create the auth token and set the cookie header.
	await createAndSetAuthCookie(userInfo, cookies);

	//* 5. Return the success response.
	return json({
		message: 'Login successful!'
	});
}

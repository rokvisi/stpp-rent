import { authSchemas } from '$lib/zod_schemas.js';
import { error, json } from '@sveltejs/kit';
import db from '$lib/server/database/db';
import { and, eq } from 'drizzle-orm';
import { pgUsers } from '$lib/database/schema.js';
import { createAndSetAuthCookie, hashPassword } from '$lib/server/auth_helper.js';
import { parseRequestBodyBySchema } from '$lib/server/api_helpers';

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     description: "Logs in a user (returns an http-only cookie with the auth token)."
 *     tags:
 *       - "Auth"
 *     responses:
 *       200:
 *         description: "Login successful!"
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 message:
 *                   type: "string"
 *                   example: "Login successful!"
 *       400:
 *         description: "The request body is invalid. Message provided in the response body."
 *       401:
 *         description: "Invalid username or password. Please check your credentials and try again."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             required:
 *               - "username"
 *               - "password"
 *             properties:
 *               username:
 *                 type: "string"
 *                 example: "user1"
 *               password:
 *                 type: "string"
 *                 example: "labas123"
 * 
*/
export async function POST({ request, cookies, locals }) {
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

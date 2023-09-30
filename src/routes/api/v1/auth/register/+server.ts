import { pgUsers } from '$lib/database/schema';
import { parseRequestBodyBySchema } from '$lib/server/api_helpers';
import { createAndSetAuthCookie, hashPassword } from '$lib/server/auth_helper';
import db from '$lib/server/database/db';
import { authSchemas } from '$lib/zod_schemas';
import { error, json } from '@sveltejs/kit';

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     description: "Registers a user (returns an http-only cookie with the auth token)."
 *     tags:
 *       - "Auth"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             required:
 *               - "username"
 *               - "password"
 *               - "role"
 *             properties:
 *               username:
 *                 type: "string"
 *                 example: "user1"
 *               password:
 *                 type: "string"
 *                 example: "labas123"
 *               role:
 *                 type: "string"
 *                 example: "renter"
 *     responses:
 *       200:
 *         description: "Registration successful."
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 message:
 *                   type: "string"
 *                   example: "Registration successful!"
 *       400:
 *         description: "The request body is invalid. Message provided in the response body."
 *       409:
 *         description: "The requested username is already taken. Please choose a different username."
 *       503:
 *         description: "Sorry, we are currently experiencing technical difficulties. Please try again later."
 * 
*/
export async function POST({ request, cookies }) {
	//* 1. Zod validate the request body.
	const { username, password, role } = await parseRequestBodyBySchema(
		request,
		authSchemas.register,
		'The data provided in the request body is invalid. Please check your registration information and try again.'
	);

	//* 2. Hash the password for database lookup.
	const passwordHash = await hashPassword(password);

	try {
		//* 3. Try to insert the user. It fails if the username is already in-use.
		await db.insert(pgUsers).values({
			username,
			password: passwordHash,
			role
		});
	} catch (e) {
		//? Username already in-use.
		if (e instanceof Error && e.message.includes("duplicate key")) {
			throw error(
				409,
				'The requested username is already taken. Please choose a different username.'
			);
		}

		//? Generic database error.
		throw error(
			503,
			'Sorry, we are currently experiencing technical difficulties. Please try again later.'
		);
	}

	//* 4. User created. Log them in.
	await createAndSetAuthCookie({ username, role }, cookies);

	//* 5. Return success response.
	return json({
		message: 'Registration successful!'
	});
}

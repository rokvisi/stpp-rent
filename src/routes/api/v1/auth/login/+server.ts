import { authSchema } from '$lib/zod_schemas.js';
import { error, redirect } from '@sveltejs/kit';
import * as jose from 'jose';
import { SECRET_JWT_SERVER_TOKEN } from '$env/static/private';
import db from '$lib/server/database/db';
import { and, eq } from 'drizzle-orm';
import { pgUsers } from '$lib/database/schema.js';
import { hashPassword } from '$lib/server/auth_helper.js';

export async function POST({ request, cookies }) {
	const requestBody = await request.json();

	try {
		//* 1. Zod validate the formData. (optional, but highly recommeded)
		const { username, password } = authSchema.parse(requestBody);
		console.log('/auth/login | ZOD VALID:', { username, password });

		//* 2. Hash the password for database lookup.
		const passwordHash = await hashPassword(password);
		console.log('Hashed password:', passwordHash);

		//* 3.1. Check if the user exists and the password matches.
		const userInfo = await db.query.pgUsers.findFirst({
			where: and(eq(pgUsers.username, username), eq(pgUsers.password, passwordHash)),
			columns: { username: true, role: true }
		});

		//* 3.2. If the user doesn't exist or the password doesn't match - return error response.
		if (userInfo === undefined) {
			console.log('User not found!');
			throw error(400); //TODO: Add proper error message.
		}

		//* 4. Create a JWT token with *some* user information.
		console.log('USER FOUND!');
		// return new Response();

		const iat = Math.floor(Date.now() / 1000);
		const exp = iat + 60 * 60; // one hour
		const jwt = await new jose.SignJWT(userInfo)
			.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
			.setExpirationTime(exp)
			.setIssuedAt(iat)
			.setNotBefore(iat)
			.sign(new TextEncoder().encode(SECRET_JWT_SERVER_TOKEN));
		console.log('/auth/login | JWT:', jwt);

		// const a = await jose.jwtVerify(res, new TextEncoder().encode(SECRET_JWT_SERVER_TOKEN));
		// console.log(a)

		//* 4.3. Set http-only cookie with the JWT token.
		cookies.set('token', jwt, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60, //? 1 Hour
			path: '/'
		});

		//* 5. Return the success response.
		return new Response();
	} catch (e) {
		//* Handle zod errors.
		// TODO:

		//* Handle JWT errors

		//* Handle other (db, ...) errors
		// TODO:

		console.log('/auth/login | ERROR', requestBody);
		console.log(e);
		throw error(401);
	}
}

import { SECRET_JWT_SERVER_TOKEN } from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';
import * as jose from 'jose';

export async function hashPassword(password: string) {
	return Buffer.from(
		await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
	).toString('base64');
}

export async function createAndSetAuthCookie(
	userInfo: {
		username: string;
		role: string;
	},
	cookies: Cookies
) {
	//* 4. Create a JWT token with *some* user information.
	const iat = Math.floor(Date.now() / 1000);
	const exp = iat + 60 * 60; // one hour
	const jwt = await new jose.SignJWT(userInfo)
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setExpirationTime(exp)
		.setIssuedAt(iat)
		.setNotBefore(iat)
		.sign(new TextEncoder().encode(SECRET_JWT_SERVER_TOKEN));

	//* 4.3. Set http-only cookie with the JWT token.
	cookies.set('token', jwt, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60, //? 1 Hour
		path: '/'
	});
}

export async function userExists(username: string) {}

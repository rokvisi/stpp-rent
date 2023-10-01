import { PRIVATE_JWT_SERVER_SECRET } from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';
import * as jose from 'jose';
import db from './database/db';
import { pgRefreshTokens } from '$lib/database/schema';
import { and, eq } from 'drizzle-orm';

export const tokenExpiration = {
	access: 60 * 5, //? 5 minutes
	refresh: 60 * 60 * 24 * 7, //? 1 week
}

export async function hashPassword(password: string) {
	return Buffer.from(
		await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
	).toString('base64');
}

export async function verifyAndDecodeToken(token: string) {
	return await jose.jwtVerify(token, new TextEncoder().encode(PRIVATE_JWT_SERVER_SECRET));
}

export async function createAccessToken(userInfo: {
	id: number,
	username: string;
	role: string;
}) {
	const iat = Math.floor(Date.now() / 1000);

	return await new jose.SignJWT(userInfo)
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setExpirationTime(iat + tokenExpiration.access)
		.setIssuedAt(iat)
		.setNotBefore(iat)
		.sign(new TextEncoder().encode(PRIVATE_JWT_SERVER_SECRET));
}

export async function createRefreshToken(userId: number) {
	const iat = Math.floor(Date.now() / 1000);

	return await new jose.SignJWT({ id: userId })
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setExpirationTime(iat + tokenExpiration.refresh)
		.setIssuedAt(iat)
		.setNotBefore(iat)
		.sign(new TextEncoder().encode(PRIVATE_JWT_SERVER_SECRET));
}

export async function writeRefreshTokenToDB(userId: number, refreshToken: string) {
	await db.insert(pgRefreshTokens).values({
		token: refreshToken,
		fk_user: userId
	})
}

export async function getRefreshTokenWithUserFromDB(userId: number, refreshToken: string) {
	return await db.query.pgRefreshTokens.findFirst({
		where: and(eq(pgRefreshTokens.fk_user, userId), eq(pgRefreshTokens.token, refreshToken)),
		with: {
			user: {
				columns: {
					id: true,
					username: true,
					role: true
				}
			}
		}
	})
}

export async function logUserIn(
	userInfo: {
		id: number,
		username: string;
		role: string;
	},
	cookies: Cookies
) {
	//* Create tokens
	const accessToken = await createAccessToken(userInfo);
	const refreshToken = await createRefreshToken(userInfo.id);

	//* Store refresh token in the db.
	await writeRefreshTokenToDB(userInfo.id, refreshToken)

	//* 4.3. Set http-only cookies with the auth and refresh tokens.
	cookies.set('accessToken', accessToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: tokenExpiration.access,
		path: '/'
	});
	cookies.set('refreshToken', refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: tokenExpiration.refresh,
		path: '/'
	});
}
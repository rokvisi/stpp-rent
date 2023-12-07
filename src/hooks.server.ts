import {
	createAccessToken,
	getRefreshTokenWithUserFromDB,
	tokenExpiration,
	verifyAndDecodeToken
} from '$lib/server/auth_helper';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authHandle: Handle = async ({ event, resolve }) => {
	//* Server looks for access-token in request: if exists and valid - OK process request;
	try {
		const accessToken = event.cookies.get('accessToken');
		const decoded = await verifyAndDecodeToken(accessToken ?? '');
		event.locals.user = {
			id: decoded.payload.id as number,
			username: decoded.payload.username as string,
			role: decoded.payload.role as string
		};

		return await resolve(event);
	} catch {
		/* noop */
	}

	//* the server looks for a refresh-token:
	//* if exists - validate by comparing it to one stored in DB
	//* and generate a new access-token (based on information from the refresh-token and DB)
	//* and process the request.
	try {
		const refreshToken = event.cookies.get('refreshToken');
		const decoded = await verifyAndDecodeToken(refreshToken ?? '');
		const userId = decoded.payload.id as number;

		//* Compare the given refresh token with the one in the database.
		const existingRefreshToken = await getRefreshTokenWithUserFromDB(userId, refreshToken!);
		if (existingRefreshToken === undefined) {
			throw new Error('Such refresh token does not exist for the specified user.');
		}

		const userInfo = {
			id: existingRefreshToken.user.id,
			username: existingRefreshToken.user.username,
			role: existingRefreshToken.user.role
		};

		//* Create new access-token.
		const accessToken = await createAccessToken(userInfo);

		//* Set the new access token as cookie.
		event.cookies.set('accessToken', accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: tokenExpiration.access,
			path: '/'
		});

		//* Set locals
		event.locals.user = userInfo;
	} catch {
		/* noop */
	}

	return await resolve(event);
};

const protectedPagesHandle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === undefined) return await resolve(event);

	//* Renter
	if (event.url.pathname.startsWith('/renter') && event.locals.user?.role !== 'renter') {
		throw redirect(303, '/auth');
	}

	//* Rentee
	if (event.url.pathname.startsWith('/rentee') && event.locals.user?.role !== 'rentee') {
		throw redirect(303, '/auth');
	}

	//* Admin
	if (event.url.pathname.startsWith('/admin') && event.locals.user?.role !== 'admin') {
		throw redirect(303, '/auth');
	}

	return await resolve(event);
};

export const handle = sequence(authHandle, protectedPagesHandle);

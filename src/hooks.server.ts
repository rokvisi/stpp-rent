import { PRIVATE_JWT_SERVER_SECRET } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import * as jose from 'jose';

const authHandle: Handle = async ({ event, resolve }) => {
	const jwt = event.cookies.get('token');
	if (jwt === undefined) return await resolve(event);

	try {
		const result = await jose.jwtVerify(jwt, new TextEncoder().encode(PRIVATE_JWT_SERVER_SECRET));
		event.locals.user = {
			username: result.payload.username as string,
			role: result.payload.role as string
		};
	} catch { /* noop */ }

	return await resolve(event);
};

export const handle = sequence(authHandle);
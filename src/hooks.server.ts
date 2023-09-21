import { SECRET_JWT_SERVER_TOKEN } from '$env/static/private';
import { resources } from '$lib/static/test.json';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import * as jose from 'jose';

const apiDocumentationRouteAliasingHandle: Handle = async ({ event, resolve }) => {
	function isValidDocumentationPathname(pathname: string) {
		return (
			pathname.startsWith('/docs/api/v1') &&
			!(pathname.endsWith('/docs/api/v1') || pathname.endsWith('/docs/api/v1/'))
		);
	}

	if (event.url.pathname.startsWith('/docs') && !isValidDocumentationPathname(event.url.pathname)) {
		throw redirect(308, `/docs/api/v1/${resources[0].resource}`);
	}

	return await resolve(event);
};

const authHandle: Handle = async ({ event, resolve }) => {
	const jwt = event.cookies.get('token');
	if (jwt === undefined) return await resolve(event);

	//TODO: DO ALL KINDS OF JWT CHECKS!
	try {
		const result = await jose.jwtVerify(jwt, new TextEncoder().encode(SECRET_JWT_SERVER_TOKEN));
		event.locals.user = {
			username: result.payload.role as string,
			role: result.payload.role as string
		};
	} catch {
		//* Invalid jwt
	}

	return await resolve(event);
};

export const handle = sequence(apiDocumentationRouteAliasingHandle, authHandle);

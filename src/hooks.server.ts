import { PRIVATE_JWT_SERVER_SECRET } from '$env/static/private';
import { resources } from '$lib/static/api_docs.json';
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

	try {
		const result = await jose.jwtVerify(jwt, new TextEncoder().encode(PRIVATE_JWT_SERVER_SECRET));
		event.locals.user = {
			username: result.payload.username as string,
			role: result.payload.role as string
		};
	} catch { /* noop */ }

	return await resolve(event);
};

export const handle = sequence(apiDocumentationRouteAliasingHandle, authHandle);

import { resources } from '$lib/static/test.json';
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from '@sveltejs/kit/hooks';

const apiDocumentationRouteAliasingHandle: Handle = async ({ event, resolve }) => {
    function isValidDocumentationPathname(pathname: string) {
        return pathname.startsWith("/docs/api/v1") && !(pathname.endsWith("/docs/api/v1") || pathname.endsWith("/docs/api/v1/"));
    }

    if (event.url.pathname.startsWith('/docs') && !isValidDocumentationPathname(event.url.pathname)) {
        throw redirect(308, `/docs/api/v1/${resources[0].resource}`);
    }

    return await resolve(event);
}

const formDataParserHandle: Handle = async ({ event, resolve }) => {
    try {
        const formData = await event.request.formData();
        if (event.request.method === "POST") {
            event.locals.formData = Object.fromEntries(formData);
        }
    }
    catch { /*no op */ }

    return await resolve(event);
}

const authHandle: Handle = async ({ event, resolve }) => {
    return await resolve(event);
}

export const handle = sequence(apiDocumentationRouteAliasingHandle, formDataParserHandle, authHandle);
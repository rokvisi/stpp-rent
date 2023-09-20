import { resources } from '$lib/static/test.json';
import { redirect } from "@sveltejs/kit";

function isValidDocumentationPathname(pathname: string) {
    return pathname.startsWith("/docs/api/v1") && !(pathname.endsWith("/docs/api/v1") || pathname.endsWith("/docs/api/v1/"));
}

export async function handle({ event, resolve }) {
    //* Handle api documentation route aliasing.
    if (event.url.pathname.startsWith('/docs') && !isValidDocumentationPathname(event.url.pathname)) {
        throw redirect(308, `/docs/api/v1/${resources[0].resource}`);
    }


    //* TODO: Auth logic.

    return await resolve(event);
}
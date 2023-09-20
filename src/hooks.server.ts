import { isValidDocumentationPathname } from "$lib/utils";
import { resources } from '$lib/static/test.json';
import { redirect } from "@sveltejs/kit";

export async function handle({ event, resolve }) {
    const pathname = event.url.pathname;

    //* Handle api documentation route aliasing.
    if (pathname.startsWith('/docs') && !isValidDocumentationPathname(pathname)) {
        throw redirect(308, `/docs/api/v1/${resources[0].resource}`);
    }

    //* TODO: Auth logic.

    return await resolve(event);
}
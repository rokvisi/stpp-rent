import { resources } from '$lib/static/test.json';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const resource = resources.find((r) => r.resource === params.resource);

    if (!resource) {
        throw error(404, {
            message: "gg"
        })
    }

    return {
        resource
    }
}
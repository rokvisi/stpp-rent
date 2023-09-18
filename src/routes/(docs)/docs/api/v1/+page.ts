import { redirect } from '@sveltejs/kit';
import { resources } from '$lib/static/test.json';

export function load() {
	throw redirect(308, `/docs/api/v1/${resources[0].resource}`);
}

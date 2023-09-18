import { resources } from '$lib/static/test.json';

export function load({ params }) {
	return resources.find((r) => r.resource === params.resource)!;
}

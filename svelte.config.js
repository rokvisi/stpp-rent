import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import * as apiDocsJson from './src/lib/static/test.json' assert { type: "json" };

function getApiDocsPages() {
	console.log(apiDocsJson.default.resources)
	return apiDocsJson.default.resources.map(r => `/docs/${r.resource_url}`);
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			runtime: 'edge'
		}),
		prerender: {
			entries: ["*", ...getApiDocsPages()]
		}
	}
};

export default config;

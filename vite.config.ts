import dotenvExpand from 'dotenv-expand';
import { sveltekit } from '@sveltejs/kit/vite';
import { loadEnv, defineConfig } from 'vite';

export default defineConfig(({ mode }) => {


	return {
		plugins: [sveltekit()]
	}
});

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				geist: 'Geist, sans-serif',
				mono: 'Geist Mono'
			}
		}
	},
	plugins: []
};

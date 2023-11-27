/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				geist: 'Geist, sans-serif',
				mono: 'Geist Mono'
			},
			dropShadow: {
				'glow-xs': [
					"0px 0px 1px #000000"
				],
				'glow-sm': [
					"0px 0px 3px #000000"
				],
				'glow-md': [
					"0px 0px 5px #000000"
				],
				'glow-xl': [
					"0px 0px 7px #000000"
				],
				'glow-2xl': [
					"0px 0px 10px #000000"
				]
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
	]
};

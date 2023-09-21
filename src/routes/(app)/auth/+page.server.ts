import { redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ locals, fetch }) => {
		const a = await fetch('/api/v1/auth/login', {
			method: 'POST',
			body: JSON.stringify(locals.formData)
		});

		throw redirect(302, '/');
	},
	register: async ({ locals, fetch }) => {
		await fetch('/api/v1/auth/register', {
			method: 'POST',
			body: JSON.stringify(locals.formData)
		});

		throw redirect(302, '/');
	},
	logout: async ({ fetch }) => {
		await fetch('/api/v1/auth/logout', {
			method: 'POST'
		});

		throw redirect(302, '/');
	}
};

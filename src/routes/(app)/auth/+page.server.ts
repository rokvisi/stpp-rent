import { redirect } from '@sveltejs/kit';
import cookie from 'cookie';

export const actions = {
	login: async ({ fetch, request }) => {
		await fetch('/api/v1/auth/login', {
			method: 'POST',
			body: JSON.stringify(Object.fromEntries(await request.formData()))
		});

		//TODO: Error handling.

		throw redirect(302, '/');
	},
	register: async ({ locals, fetch }) => {
		await fetch('/api/v1/auth/register', {
			method: 'POST',
			body: JSON.stringify(locals.formData)
		});

		//TODO: Error handling.

		throw redirect(302, '/');
	},
	logout: async ({ fetch }) => {
		await fetch('/api/v1/auth/logout', {
			method: 'POST'
		});

		//TODO: Error handling.

		throw redirect(302, '/');
	}
};

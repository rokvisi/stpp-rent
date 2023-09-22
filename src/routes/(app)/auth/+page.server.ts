import { authSchemas } from '$lib/zod_schemas';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate, setError, message } from 'sveltekit-superforms/server';

export async function load() {
	return {
		authForm: await superValidate(
			{ username: 'user1', password: 'labas123', role: 'rentee' },
			authSchemas.register
		)
	};
}

export const actions = {
	login: async ({ fetch, request }) => {
		const form = await superValidate(request, authSchemas.register);
		if (!form.valid) {
			return fail(400, { form });
		}

		const res = await fetch('/api/v1/auth/login', {
			method: 'POST',
			body: JSON.stringify(form.data)
		});
		if (!res.ok) {
			return message(form, 'Incorrect username or password!', {
				status: 403
			});
		}

		throw redirect(302, '/');
	},
	register: async ({ fetch, request }) => {
		const form = await superValidate(request, authSchemas.register);
		if (!form.valid) {
			return fail(400, { form });
		}

		const res = await fetch('/api/v1/auth/register', {
			method: 'POST',
			body: JSON.stringify(form.data)
		});
		if (!res.ok) {
			return setError(form, 'username', 'Username already exists.');
		}

		throw redirect(302, '/');
	},
	logout: async ({ fetch }) => {
		const res = await fetch('/api/v1/auth/logout', {
			method: 'POST'
		});
		if (!res.ok) {
			throw error(400);
		}

		throw redirect(302, '/auth');
	}
};

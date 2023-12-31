import { authSchemas } from '$lib/zod_schemas';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate, setError, message } from 'sveltekit-superforms/server';

export async function load() {
	return {
		authForm: await superValidate(
			authSchemas.register
		)
	};
}

const roleToRedirectUrlMap: Record<string, string> = {
	"rentee": "/rentee/houses",
	"renter": "/renter/listings",
	"admin": "/admin/images",
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
			const resBody = await res.json();
			return message(form, resBody.message, { status: res.status as any });
		}

		const role = (await res.json()).role as ("rentee" | "renter" | 'admin');
		throw redirect(302, roleToRedirectUrlMap[role] ?? "/");
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
			if (res.status === 409) {
				return setError(form, 'username', 'Username already exists.');
			}
			const resBody = await res.json();
			return message(form, resBody.message, { status: res.status as any });
		}

		const role = (await res.json()).role as ("rentee" | "renter" | 'admin');
		throw redirect(302, roleToRedirectUrlMap[role] ?? "/");
	},
	logout: async ({ fetch }) => {
		const res = await fetch('/api/v1/auth/logout', {
			method: 'DELETE'
		});
		if (!res.ok) {
			throw error(400);
		}

		throw redirect(302, '/auth');
	}
};

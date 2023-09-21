import { redirect } from '@sveltejs/kit';
import cookie from 'cookie';

export const actions = {
	login: async (event) => {
		console.log('HERE');
		// const o = Object.fromEntries(await event.request.formData());
		console.log('HERE after form data');

		console.log('IN LOGIN ACTION');

		const res = await event.fetch('/api/v1/auth/login', {
			method: 'POST',
			body: JSON.stringify(event.locals)
		});

		// //* Forward cookies
		// const parsedCookies = cookie.parse(res.headers.getSetCookie()[0]);
		// cookies.set('token', parsedCookies.token, {
		// 	httpOnly: true,
		// 	secure: true,
		// 	...{
		// 		...parsedCookies,
		// 		token: undefined
		// 	}
		// });

		throw redirect(302, '/');
	},
	register: async ({ locals, fetch, cookies }) => {
		const res = await fetch('/api/v1/auth/register', {
			method: 'POST',
			body: JSON.stringify(locals.formData)
		});

		//* Forward cookies
		const parsedCookies = cookie.parse(res.headers.getSetCookie()[0]);
		cookies.set('token', parsedCookies.token, {
			httpOnly: true,
			secure: true,
			...{
				...parsedCookies,
				token: undefined
			}
		});

		throw redirect(302, '/');
	},
	logout: async ({ cookies }) => {
		cookies.delete('token', { path: '/' });

		throw redirect(302, '/');
	}
};

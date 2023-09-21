export async function POST({ cookies }) {
	cookies.set('random', 'works:)', {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60, //? 1 Hour
		path: '/'
	});

	return new Response();
}

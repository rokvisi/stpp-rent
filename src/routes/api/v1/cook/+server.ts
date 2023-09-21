export async function POST({ cookies }) {
	cookies.set('random', 'works', {
		path: '/'
	});

	return new Response();
}

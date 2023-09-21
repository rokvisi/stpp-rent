export async function POST({ cookies }) {
	cookies.delete('token', { path: '/' });
	return new Response();
}

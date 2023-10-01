import { json } from '@sveltejs/kit';

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     description: "Deletes the user auth token cookie."
 *     tags:
 *       - "Auth"
 *     responses:
 *       200:
 *         description: "Log out successful!"
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 message:
 *                   type: "string"
 *                   example: "Log out successful!"
 * 
*/
export async function POST({ cookies }) {
	cookies.delete('accessToken', { path: '/' });
	cookies.delete('refreshToken', { path: '/' });
	return json({
		message: 'Log out successful!'
	})
}

import { json } from '@sveltejs/kit';

/**
 * @openapi
 * /api/v1/auth/logout:
 *   delete:
 *     description: "Logs out the user (deletes the access and refresh token cookies)."
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
 *                   default: "Log out successful!"
 * 
*/
export async function DELETE({ cookies }) {
	cookies.delete('accessToken', { path: '/' });
	cookies.delete('refreshToken', { path: '/' });

	return json({
		message: 'Log out successful!'
	})
}

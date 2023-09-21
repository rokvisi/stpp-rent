export async function hashPassword(password: string) {
	return Buffer.from(
		await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
	).toString('base64');
}

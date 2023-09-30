import { z } from 'zod';

export const authSchemas = {
	login: z.object({
		username: z.string().min(3, 'Must be at least 3 characters long.'),
		password: z.string().min(5, 'Must be at least 5 characters long.')
	}),
	register: z.object({
		username: z.string().min(3, 'Must be at least 3 characters long.'),
		password: z.string().min(5, 'Must be at least 5 characters long.'),
		role: z.enum(['renter', 'rentee', 'admin'])
	})
};

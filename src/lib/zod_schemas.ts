import { z } from 'zod';

export const authSchemas = {
	login: z.object({
		username: z.string().nonempty(),
		password: z.string().nonempty()
	}),
	register: z.object({
		username: z.string().nonempty(),
		password: z.string().nonempty(),
		role: z.enum(['renter', 'rentee'])
	})
};

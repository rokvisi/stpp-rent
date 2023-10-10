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

export const houseSchemas = {
	post: z.object({
		name: z.string().min(3, 'Must be at least 3 characters long.'),
		region: z.string().min(3, 'Must be at least 3 characters long.'),
		district: z.string().min(3, 'Must be at least 3 characters long.'),
		location_description: z.string().min(3, 'Must be at least 3 characters long.'),
		wifi_speed: z.number()
		//! Image is not handled since it is a file. Make sure to handle it separately.
	}),
	patch: z.object({
		name: z.string().min(3, 'Must be at least 3 characters long.').optional(),
		region: z.string().min(3, 'Must be at least 3 characters long.').optional(),
		district: z.string().min(3, 'Must be at least 3 characters long.').optional(),
		location_description: z.string().min(3, 'Must be at least 3 characters long.').optional(),
		wifi_speed: z.number().optional()
		//! Image is not handled since it is a file. Make sure to handle it separately.
	})
}

export const roomSchemas = {
	post: z.object({
		number: z.number().positive("Must be positive."),
		price: z.number().positive("Must be positive."),
		description: z.string().min(3, 'Must be at least 3 characters long.'),
	}),
	patch: z.object({
		number: z.number().positive("Must be positive.").optional(),
		price: z.number().positive("Must be positive.").optional(),
		description: z.string().min(3, 'Must be at least 3 characters long.').optional(),
	})
}
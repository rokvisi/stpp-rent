import { z } from 'zod';
import { zfd } from 'zod-form-data';

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
	postHouse: zfd.formData({
		name: zfd.text(z.string().min(3, 'Must be at least 3 characters long.')),
		region: zfd.text(z.string().min(3, 'Must be at least 3 characters long.')),
		district: zfd.text(z.string().min(3, 'Must be at least 3 characters long.')),
		location_description: zfd.text(z.string().min(3, 'Must be at least 3 characters long.')),
		wifi_speed: zfd.numeric(),
		image: zfd.file()
	}),
	create: z.object({
		name: z.string().min(3, 'Must be at least 3 characters long.'),
		region: z.string().min(3, 'Must be at least 3 characters long.'),
		district: z.string().min(3, 'Must be at least 3 characters long.'),
		location_description: z.string().min(3, 'Must be at least 3 characters long.'),
		wifi_speed: z.number()
		//! Image is not handled since it is a file. Make sure to handle it separately.
	}),
	delete: z.object({
		id: z.number()
	})
}
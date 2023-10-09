import { error } from '@sveltejs/kit';
import type { z } from 'zod';

export async function getRequestBody(request: Request) {
	try {
		return await request.json();
	} catch (e) {
		//? Invalid request body or somehow already consumed.
		throw error(400, 'The request body is invalid.');
	}
}
export async function getRequestFormData(request: Request) {
	try {
		return await request.formData();
	} catch (e) {
		//? Invalid request body or somehow already consumed.
		throw error(400, 'The request formData is invalid.');
	}
}


export async function parseRequestBodyBySchema<Z extends z.ZodTypeAny>(
	request: Request,
	schema: Z,
	zodErrMsg: string
): Promise<z.infer<Z>> {
	const body = await getRequestBody(request);

	try {
		return schema.parse(body);
	} catch (e) {
		//? Invalid request body structure.
		throw error(400, zodErrMsg);
	}
}

export async function parseRequestFormDataBySchema<Z extends z.ZodTypeAny>(
	request: Request,
	schema: Z,
	zodErrMsg: string
): Promise<z.infer<Z>> {
	const formData = await getRequestFormData(request);

	try {
		return schema.parse(formData);
	} catch (e) {
		//? Invalid request formData structure.
		throw error(400, zodErrMsg);
	}
}

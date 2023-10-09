import { houseSchemas } from '$lib/zod_schemas';
import { superValidate } from 'sveltekit-superforms/server';

export async function load() {
    return {
        authForm: await superValidate(houseSchemas.create)
    };
}
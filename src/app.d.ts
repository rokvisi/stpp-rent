// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			formData: Record<string, any>;
			user: {
				username: string;
				role: string;
			} | null;
		}
		interface PageData {
			user: {
				username: string;
				role: string;
			} | null;
		}
		// interface Platform {}
	}
}

export {};

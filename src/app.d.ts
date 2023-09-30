// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				username: string;
				role: string;
			} | undefined;
		}
		interface PageData {
			user: {
				username: string;
				role: string;
			} | undefined;
		}
		// interface Platform {}
	}
}

export { };

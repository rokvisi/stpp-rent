// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				id: number,
				username: string;
				role: string;
			} | undefined;
		}
		interface PageData {
			user: {
				id: number,
				username: string;
				role: string;
			} | undefined;
		}
		// interface Platform {}
	}
}

export { };

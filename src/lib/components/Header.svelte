<script lang="ts">
	import { page } from '$app/stores';
	import { sidebar } from '$lib/stores/sidebar';
	import { getPageTitle } from '$lib/utils';
</script>

<header class="flex items-center justify-between bg-zinc-800 px-4 py-4 shadow md:px-12">
	<div class="flex flex-1 items-center gap-3">
		<button class="md:hidden" on:click={sidebar.toggle}
			><svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="inline-block h-6 w-6 transition-transform"
				class:rotate-90={$sidebar}
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
				/>
			</svg>
		</button>
		<a href="/" class="text-mono inline-block text-lg uppercase tracking-wider">Rentee</a>
	</div>
	<span class="flex-2">{getPageTitle($page.url.pathname)}</span>
	<nav class="flex-1 space-x-4 text-right md:space-x-8">
		<slot />
	</nav>
</header>

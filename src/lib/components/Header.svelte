<script lang="ts">
	import { page } from '$app/stores';
	import { getPageTitle } from '$lib/utils';
</script>

<header class="flex items-center justify-between bg-zinc-800 px-4 py-2 shadow md:px-12 md:py-4">
	<span class="text-mono text-lg uppercase tracking-wider">Rentee</span>
	<span>{getPageTitle($page.url.pathname)}</span>
	<nav>
		<slot />
	</nav>
</header>

<script lang="ts">
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
	import { resources } from '$lib/static/test.json';
</script>

<div class="grid min-h-screen grid-rows-[auto_1fr_auto]">
	<header class="flex items-center justify-between bg-zinc-800 px-12 py-4 shadow">
		<span class="text-mono text-lg uppercase tracking-wider">Rentee</span>
		<span>API Reference</span>
		<nav>
			<a href="/">Home</a>
		</nav>
	</header>
	<div class="grid grid-cols-[auto_1fr]">
		<aside class="border-r border-stone-500 bg-neutral-800 pl-8 pr-24 pt-20 text-neutral-400">
			<p class="pb-2 font-semibold uppercase tracking-widest">Resources</p>
			<ul>
				{#each resources as resource}
					{@const pathname = `/docs/api/v1/${resource.resource}`}
					<li class="pb-1">
						<a
							class="aria-[current]:font-bold aria-[current]:text-neutral-200"
							aria-current={$page.url.pathname === pathname ? 'true' : undefined}
							href={pathname}>{resource.method} {resource.resource}</a
						>
					</li>
				{/each}
			</ul>
		</aside>
		<main class="px-12 pb-10 pt-20">
			<slot />
		</main>
	</div>
	<Footer />
</div>

<script lang="ts">
	import { page } from '$app/stores';
	import { resources } from '$lib/static/test.json';
	import Header from '$lib/components/Header.svelte';
</script>

<Header>
	<span slot="title">API Reference</span>
	<a slot="nav" href="/">Home</a>
</Header>
<div class="grid grid-cols-[auto_1fr]">
	<aside
		class="border-r border-stone-500 bg-neutral-800 pl-4 pr-8 pt-12 text-neutral-400 md:pl-8 md:pr-24 md:pt-20"
	>
		<p class="pb-2 font-semibold uppercase tracking-widest">Resources</p>
		<ul>
			{#each resources as resource}
				{@const pathname = `/docs/api/v1/${resource.resource}`}
				{@const isCurrent = $page.url.pathname === pathname ? 'true' : undefined}
				{@const text = `${resource.method} ${resource.resource}`}
				<li class="pb-1">
					<a
						class="aria-[current]:font-bold aria-[current]:text-neutral-200"
						aria-current={isCurrent}
						href={pathname}
					>
						{text}
					</a>
				</li>
			{/each}
		</ul>
	</aside>
	<main class="px-4 pb-4 pt-12 md:px-12 md:pb-10 md:pt-20">
		<slot />
	</main>
</div>

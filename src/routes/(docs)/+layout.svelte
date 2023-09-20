<script lang="ts">
	import { page } from '$app/stores';
	import { resources } from '$lib/static/test.json';
	import Header from '$lib/components/Header.svelte';
	import MainContent from '$lib/components/MainContent.svelte';
</script>

<Header>
	<a href="/">Home</a>
</Header>
<div class="grid grid-cols-[auto_1fr]">
	<aside
		class="border-r border-stone-500 bg-neutral-800 pl-4 pr-4 pt-10 text-neutral-400 md:pl-12 md:pr-24 md:pt-20"
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
	<MainContent>
		<slot />
	</MainContent>
</div>

<script lang="ts">
	import { page } from '$app/stores';
	import { resources } from '$lib/static/test.json';
</script>

<div class="relative grid grid-rows-[auto_1fr_auto] min-h-screen">
	<header class="bg-zinc-800 px-12 flex items-center justify-between shadow py-4">
		<span class="text-lg text-mono uppercase tracking-wider">Rentee</span>
		<span>API Reference</span>
		<nav>
			<a href="/">Home</a>
		</nav>
	</header>
	<div class="grid grid-cols-[auto_1fr]">
		<aside class="bg-neutral-800 pl-8 pt-20 pr-24 text-neutral-400 border-r border-stone-500">
			<p class="font-semibold tracking-widest uppercase pb-2">Resources</p>
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
		<main class="pt-20 pb-10 px-12">
			<slot />
		</main>
	</div>
	<footer class="bg-zinc-800 flex items-center justify-between px-12 py-4 shadow">
		<div>
			<p>T120B165 Saityno taikomųjų programų projektavimas</p>
			<p>Dėstytojas: Tomas Blažauskas</p>
		</div>
		<p>Rokas Višinskas - IFF-0/1</p>
	</footer>
</div>

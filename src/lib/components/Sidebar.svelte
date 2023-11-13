<script>
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { sidebar } from '$lib/stores/sidebar';
	import Spinner from './icons/Spinner.svelte';
	import { roleNavLinks } from './role-navs/roleNavLinks';

	let isNavigating = false;
	beforeNavigate(() => (isNavigating = true));
	afterNavigate(sidebar.hide);
</script>

<section class="block bg-zinc-700 px-4 pb-4 pt-10">
	{#if isNavigating}
		<div class="flex h-full items-center justify-center px-3 py-2">
			<Spinner />
		</div>
	{:else}
		<nav>
			{#each roleNavLinks[$page.data.user?.role ?? ''] as link}
				<a
					href={link.href}
					class="block rounded px-3 py-2 text-stone-400 underline-offset-8 hover:bg-zinc-800 aria-[current]:text-stone-300 aria-[current]:underline"
					aria-current={$page.url.pathname === link.href ? 'true' : undefined}>{link.title}</a
				>
			{/each}
			<a
				href="/swagger/index.html"
				class="block rounded px-3 py-2 text-stone-400 underline-offset-8 hover:bg-zinc-800 aria-[current]:text-stone-300 aria-[current]:underline"
				>API Docs</a
			>
		</nav>

		{#if $page.data.user}
			<form action="/auth?/logout" method="POST">
				<button class="block w-full rounded px-3 py-2 text-left text-stone-400 hover:bg-zinc-800"
					>Logout</button
				>
			</form>
		{/if}
	{/if}
</section>

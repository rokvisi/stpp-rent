<script lang="ts">
	import { page } from '$app/stores';
	import { sidebar } from '$lib/stores/sidebar';
	import { getPageTitle } from '$lib/utils';
	import HamburgerIcon from './icons/HamburgerIcon.svelte';
	import { roleNavLinks } from './role-navs/roleNavLinks';
</script>

<header class="overflow-hidden shadow">
	<div class="flex items-center justify-between bg-zinc-800 px-4 py-4 sm:px-12">
		<div class="flex flex-1 items-center gap-3">
			{#if $page.data.user}
				<button class="touch-manipulation sm:hidden" on:click={sidebar.toggle}>
					<HamburgerIcon rotate90={$sidebar} />
				</button>
			{/if}

			<a href="/" class="text-mono inline-block text-lg uppercase tracking-wider">Rentee</a>
		</div>
		<span class="flex-2 mx-8 overflow-hidden overflow-ellipsis whitespace-nowrap"
			>{getPageTitle($page.url.pathname)}</span
		>
		<div class="flex-1 space-x-4 text-right sm:space-x-2">
			{#if $page.data.user}
				<div class="inline-flex gap-2">
					<span
						>{$page.data.user.username}<span class="text-xs italic">({$page.data.user.role})</span
						></span
					>
					<form class="hidden sm:block" action="/auth?/logout" method="POST">
						<button class="text-[#f96743] underline underline-offset-4">Logout</button>
					</form>
				</div>
			{:else}
				<a href="/auth" class="text-[#f96743] underline underline-offset-4">Login</a>
			{/if}
		</div>
	</div>

	{#if $page.data.user}
		<nav class="hidden overflow-auto px-12 py-1 sm:flex">
			{#each roleNavLinks[$page.data.user.role] as link}
				<a
					href={link.href}
					class="rounded px-3 py-2 text-stone-400 underline-offset-8 hover:bg-zinc-800 aria-[current]:text-stone-300 aria-[current]:underline"
					aria-current={$page.url.pathname.startsWith(link.href) ? 'true' : undefined}
					>{link.title}</a
				>
			{/each}
		</nav>
	{/if}
</header>

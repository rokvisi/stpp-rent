<script>
	import '../app.css';
	import FontPreload from '$lib/components/FontPreload.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import MainContent from '$lib/components/MainContent.svelte';
	import { sidebar } from '$lib/stores/sidebar';

	beforeNavigate(sidebar.hide);
</script>

<svelte:head>
	<title>Rentee</title>
	<FontPreload
		paths={[
			'/fonts/overpass/overpass-v13-latin-regular.woff2',
			'/fonts/overpass/overpass-v13-latin-600.woff2',
			'/fonts/overpass/overpass-v13-latin-700.woff2',
			'/fonts/overpass/overpass-mono-v16-latin-regular.woff2'
		]}
	/>
</svelte:head>

<div class="relative grid min-h-screen grid-rows-[auto_1fr_auto] overflow-hidden">
	<Header>
		{#if $page.data.user}
			<div class="inline-flex gap-2">
				<span
					>{$page.data.user.username}<span class="text-xs italic">({$page.data.user.role})</span
					></span
				>
				<form class="hidden md:block" action="/auth?/logout" method="POST">
					<button>Logout</button>
				</form>
			</div>
		{:else}
			<a href="/auth">Login</a>
		{/if}

		<a class="hidden md:inline" href="/swagger/index.html">Docs</a>
	</Header>
	{#if $sidebar}
		<section class="block bg-zinc-700 px-20 py-20">
			{#if $page.data.user}
				<form action="/auth?/logout" method="POST">
					<button>Logout</button>
				</form>
			{/if}
		</section>
	{:else}
		<MainContent>
			<slot />
		</MainContent>
	{/if}
	<Footer />
</div>

<style lang="postcss">
	:global(html) {
		@apply bg-zinc-900 font-overpass text-stone-300;
	}
</style>

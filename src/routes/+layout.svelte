<script>
	import '../app.css';
	import FontPreload from '$lib/components/FontPreload.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import MainContent from '$lib/components/MainContent.svelte';
	import { sidebar } from '$lib/stores/sidebar';
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<svelte:head>
	<title>Rentee</title>
	<FontPreload
		paths={['/fonts/geist/GeistVariableVF.woff2', '/fonts/geist/GeistMonoVariableVF.woff2']}
	/>
</svelte:head>

<div class="relative grid min-h-screen grid-rows-[auto_1fr_auto] overflow-hidden">
	<Header />
	{#if $sidebar}
		<Sidebar />
	{:else}
		<MainContent>
			<slot />
		</MainContent>
	{/if}
	<Footer />
</div>

<style lang="postcss">
	:global(html) {
		@apply bg-zinc-900 font-geist text-stone-300;
	}
</style>

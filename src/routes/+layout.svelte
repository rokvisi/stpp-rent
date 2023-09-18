<script>
	import FontPreload from '$lib/components/FontPreload.svelte';
	import '../app.css';
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

<slot />

<style lang="postcss">
	:global(html) {
		@apply bg-zinc-900 font-overpass text-stone-300;
	}
</style>

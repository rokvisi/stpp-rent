<script>
	import Header from '$lib/components/Header.svelte';
</script>

<Header>
	<span slot="title">Home</span>
	<a slot="nav" href="/docs/api/v1">Docs</a>
</Header>
<main class="px-4 pb-4 pt-10 md:px-12 md:pb-10 md:pt-20">
	<slot />
</main>

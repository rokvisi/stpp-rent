<script>
	import Header from '$lib/components/Header.svelte';
	import MainContent from '$lib/components/MainContent.svelte';
</script>

<Header>
	<a href="/docs/api/v1">Docs</a>
</Header>
<MainContent>
	<slot />
</MainContent>

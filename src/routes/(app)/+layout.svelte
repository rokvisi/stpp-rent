<script>
	import Header from '$lib/components/Header.svelte';
	import MainContent from '$lib/components/MainContent.svelte';
	import { resources } from '$lib/static/test.json';
</script>

<Header>
	<a href="/docs/api/v1/{resources[0].resource}">Docs</a>
	<a href="/auth">Login</a>
</Header>
<MainContent>
	<slot />
</MainContent>

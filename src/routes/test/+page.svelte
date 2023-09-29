<script>
	import { onMount } from 'svelte';
	import SwaggerUI from 'swagger-ui';
	import Header from '$lib/components/Header.svelte';
	import 'swagger-ui/dist/swagger-ui.css';

	onMount(() => {
		SwaggerUI({
			url: '/generated.json',
			dom_id: '#here'
		});
	});
</script>

<Header>
	<a href="/">Home</a>
</Header>
<div id="here" />

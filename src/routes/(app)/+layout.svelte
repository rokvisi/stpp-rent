<script>
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import MainContent from '$lib/components/MainContent.svelte';
	import { resources } from '$lib/static/test.json';
</script>

<Header>
	{#if $page.data.user}
		<div class="inline-flex gap-2">
			<span
				>{$page.data.user.username}<span class="text-xs italic">({$page.data.user.role})</span
				></span
			>
			<form action="/auth?/logout" method="POST">
				<button>Logout</button>
			</form>
		</div>
	{:else}
		<a href="/auth">Login</a>
	{/if}

	<a href="/docs/api/v1/{resources[0].resource}">Docs</a>
</Header>
<MainContent>
	<slot />
</MainContent>

<script>
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import MainContent from '$lib/components/MainContent.svelte';
	import { resources } from '$lib/static/api_docs.json';
	import { sidebar } from '$lib/stores/sidebar';

	beforeNavigate(sidebar.hide);
</script>

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

	<!-- <a class="hidden md:inline" href="/docs/api/v1/{resources[0].resource}">Docs</a> -->
	<a class="hidden md:inline" href="/swagger">Docs</a>
</Header>

{#if $sidebar}
	<section class="block bg-zinc-700 px-20 py-20">
		{#if $page.data.user}
			<form action="/auth?/logout" method="POST">
				<button>Logout</button>
			</form>
		{/if}
		<nav>
			<ul>
				<li><a href="/docs/api/v1/{resources[0].resource}">Docs</a></li>
			</ul>
		</nav>
	</section>
{:else}
	<MainContent>
		<slot />
	</MainContent>
{/if}

<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import MainContent from '$lib/components/MainContent.svelte';
	import { sidebar } from '$lib/stores/sidebar';
	import { beforeNavigate } from '$app/navigation';
	import _ from 'lodash-es';
	import ApiResourceList from './APIResourceList.svelte';

	beforeNavigate(sidebar.hide);
</script>

<Header>
	<a href="/">Home</a>
</Header>
<div class="grid grid-cols-[auto_1fr]">
	{#if $sidebar}
		<section class="col-span-full block space-y-6 bg-zinc-700 px-20 py-20">
			<ApiResourceList />
		</section>
	{:else}
		<aside
			class="hidden space-y-6 border-r border-stone-500 bg-neutral-800 pl-4 pr-4 pt-10 text-neutral-400 md:block md:pl-12 md:pr-24 md:pt-20"
		>
			<ApiResourceList />
		</aside>
		<MainContent>
			<slot />
		</MainContent>
	{/if}
</div>

<script lang="ts">
	import ArrowUpCircleIcon from './icons/ArrowUpCircleIcon.svelte';

	export let opened = false;
	export let title = 'title';
</script>

<div>
	<button
		class="mb-2 flex w-full items-center gap-2 border-b border-neutral-500 py-1 text-xl"
		on:click={() => (opened = !opened)}
	>
		<ArrowUpCircleIcon class="transition-all {opened ? '' : '-rotate-90'}" />
		{title}</button
	>
	{#if opened}
		<slot />
	{/if}
</div>

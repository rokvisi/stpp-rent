<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte';
	import ArrowLeftIcon from '$lib/components/icons/ArrowLeftIcon.svelte';
</script>

<PageHeading>
	<button class="mr-2 hover:text-stone-600" on:click={() => history.back()}>
		<ArrowLeftIcon cclass="w-10 h-10" />
	</button>
	<p><slot /></p>
</PageHeading>

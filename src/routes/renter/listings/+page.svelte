<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import HouseCardRenter from './HouseCardRenter.svelte';

	export let data;
	$: houses = data.houses;
</script>

<PageHeading>
	My house listings
	<a class="inline-block rounded-full p-2 hover:text-stone-600" href="/renter/listings/create">
		<PlusIcon cclas="w-10 h-10" />
	</a>
</PageHeading>

<div class="flex flex-wrap gap-8">
	{#each houses as house (house.id)}
		<HouseCardRenter {house} />
	{/each}
</div>

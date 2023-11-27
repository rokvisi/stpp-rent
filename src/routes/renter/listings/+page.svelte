<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import HouseCardRenter from './HouseCardRenter.svelte';

	export let data;
	$: houses = data.houses;
</script>

<div class="flex flex-col gap-2">
	<PageHeading>
		My house listings
		<a class="inline-block rounded-full p-2 hover:text-stone-600" href="/renter/listings/create">
			<PlusIcon cclas="w-10 h-10" />
		</a>
	</PageHeading>

	<div class="grid grid-cols-1 gap-0 gap-x-4 gap-y-8 md:grid-cols-4">
		{#each houses as house (house.id)}
			<HouseCardRenter {house} />
		{/each}
	</div>
</div>

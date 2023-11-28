<script lang="ts">
	import HouseCard from '$lib/components/HouseCard.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';

	export let data;
	$: houses = data.houses;
</script>

<PageHeading>All house listings</PageHeading>
<div class="flex flex-wrap gap-8">
	{#each houses as house (house.id)}
		<HouseCard {house} />
	{/each}
</div>

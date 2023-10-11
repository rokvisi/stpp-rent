<script lang="ts">
	import HouseCard from '$lib/components/HouseCard.svelte';

	export let data;
	$: houses = data.houses;
</script>

<h1 class="pb-4 text-5xl">Home page</h1>

<div class="grid grid-cols-1 gap-4 md:grid-cols-4">
	{#each houses as house (house.id)}
		<HouseCard {house} />
	{/each}
</div>

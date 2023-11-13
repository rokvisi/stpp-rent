<script lang="ts">
	import HouseCardRenter from './HouseCardRenter.svelte';

	export let data;
	$: houses = data.houses;
</script>

<div class="flex flex-col gap-2">
	<h1 class="pb-4 text-5xl">My house listings</h1>
	<a class="inline-block rounded border p-2" href="/renter/create-house">Create new house listing</a
	>
	<div>
		<div class="flex flex-col gap-4">
			{#each houses as house (house.id)}
				<HouseCardRenter {house} />
			{/each}
		</div>
	</div>
</div>

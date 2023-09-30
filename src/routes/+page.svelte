<script lang="ts">
	export let data;
	$: houses = data.houses;
</script>

<h1 class="pb-4 text-5xl">Home page</h1>

<div>
	{#each houses as house (house.id)}
		<div class="flex flex-col rounded border p-2">
			<div>
				<p>House information</p>
				<p>Name: {house.name}</p>
				<p>Description: {house.description}</p>
				<p>City: {house.city}</p>
				<p>Street: {house.street}</p>
				<p>RenterID: {house.fk_renter}</p>
			</div>
			<hr />
			<div class="p-2">
				<p>Renter: {house.renter.username}</p>
			</div>
		</div>
	{/each}
</div>

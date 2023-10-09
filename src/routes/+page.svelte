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
				<p>{house.name}</p>
				<p>{house.region}/{house.district}</p>
				<img src={house.image_url} alt="banner" />
				<p>RenterID: {house.fk_renter}</p>
			</div>
			<hr />
			<div class="p-2">
				<p>Renter: {house.renter.username}</p>
			</div>
		</div>
	{/each}
</div>

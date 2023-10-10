<script lang="ts">
	export let data;
	$: houses = data.houses;
</script>

<h1 class="pb-4 text-5xl">Home page</h1>

<div class="flex flex-col gap-4">
	{#each houses as house (house.id)}
		<div class="flex flex-col rounded border p-2">
			<div>
				<p>House ID: {house.id}</p>
				<p>{house.name}</p>
				<p>{house.region}/{house.district}</p>
				<img class="rounded" src={house.image_url} alt="banner" />
			</div>
		</div>
	{/each}
</div>

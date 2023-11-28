<script lang="ts">
	import Spinner from '$lib/components/icons/Spinner.svelte';
	import ImageManagerGrid from './ImageManagerGrid.svelte';

	export let data;
</script>

<section>
	<h2 class="mb-1 text-2xl">House images:</h2>
	<hr class="mb-4" />
	{#await data.streamed.houseImagesPromise}
		<div class="mb-4 mt-2 flex items-center">
			<Spinner />
		</div>
	{:then houseImages}
		<ImageManagerGrid images={houseImages} />
	{/await}
</section>

<section>
	<h2 class="mb-1 mt-8 text-2xl">Room images:</h2>
	<hr class="mb-4" />
	{#await data.streamed.roomImagesPromise}
		<div class="mb-4 mt-2 flex items-center">
			<Spinner />
		</div>
	{:then roomImages}
		<ImageManagerGrid images={roomImages} />
	{/await}
</section>

<section>
	<h2 class="mb-1 mt-8 text-2xl">Common area images:</h2>
	<hr class="mb-4" />
	{#await data.streamed.commonAreaImagesPromise}
		<div class="mb-4 mt-2 flex items-center">
			<Spinner />
		</div>
	{:then commonAreaImages}
		<ImageManagerGrid images={commonAreaImages} />
	{/await}
</section>

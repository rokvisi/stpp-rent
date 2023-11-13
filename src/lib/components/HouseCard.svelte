<script lang="ts">
	import type { House } from '$lib/database/schema';
	import PriceTagIcon from './icons/PriceTagIcon.svelte';

	type HouseCardData = Omit<
		House & {
			room_price_min: number;
			room_price_max: number;
		},
		'fk_renter'
	>;
	export let house: HouseCardData;

	$: rooms_exist = house.room_price_min !== 0;
	$: room_price_single =
		house.room_price_min === house.room_price_max ? house.room_price_min : undefined;
</script>

<div class="flex max-w-sm flex-col gap-2 rounded-xl border border-t-4 border-zinc-500 p-2 shadow">
	<img class="rounded" src={house.image_url} alt="banner" />

	<div>
		<p>{house.id}</p>
		<p>{house.name}</p>
		<p class="font-light italic">{house.region}/{house.district}</p>
		<p class="flex items-center gap-2">
			<PriceTagIcon />
			{#if rooms_exist}
				{#if room_price_single}
					{room_price_single} Euro
				{:else}
					{house.room_price_min} - {house.room_price_max} Euro
				{/if}
			{:else}
				-
			{/if}
		</p>
	</div>
</div>

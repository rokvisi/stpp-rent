<script lang="ts">
	import type { House } from '$lib/database/schema';

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
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
				/>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
			</svg>
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

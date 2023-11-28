<script lang="ts">
	import BedIcon from '$lib/components/icons/BedIcon.svelte';

	import type { House } from '$lib/database/schema';
	type HouseCardData = House & {
		room_price_min: number;
		room_price_max: number;
		availableRooms: number;
		rooms: any[];
	};

	export let house: HouseCardData;
</script>

<a
	href="/renter/listings/{house.id}"
	class="flex max-w-sm flex-col gap-2 rounded-xl border border-t-4 border-stone-600 p-2 drop-shadow-xl hover:border-stone-400"
>
	<img
		class="aspect-[4/3] rounded"
		src={house.image_url ??
			'https://ghryg4oekbndllfk.public.blob.vercel-storage.com/banner-C3cjpFtJVWCFrsAszkgMxXlXpsahB9.webp'}
		alt="banner"
	/>

	<div>
		<p class="text-lg">
			{house.name} - <span class="font-light">{house.region} / {house.district}</span>
		</p>
		<p class="mb-1 flex items-center gap-2">
			<BedIcon /><span>{house.availableRooms} / {house.rooms.length} available rooms </span>
		</p>
	</div>
</a>

<script lang="ts">
	import type { House } from '$lib/database/schema';
	export let house: House;
</script>

<a href="/renter/listings/{house.id}">
	<div class="flex max-w-sm flex-col gap-2 rounded-xl border border-t-4 border-zinc-500 p-2 shadow">
		<img class="rounded" src={house.image_url} alt="banner" />

		<div>
			<p>{house.id}</p>
			<p>{house.name}</p>
			<p class="font-light italic">{house.region}/{house.district}</p>
		</div>
	</div>
</a>

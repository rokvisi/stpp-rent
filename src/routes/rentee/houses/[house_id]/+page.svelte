<script lang="ts">
	import ActionDialog from '$lib/components/ActionDialog.svelte';
	import BedIcon from '$lib/components/icons/BedIcon.svelte';
	import PriceTagIcon from '$lib/components/icons/PriceTagIcon.svelte';
	import ShowerIcon from '$lib/components/icons/ShowerIcon.svelte';
	import WarningIcon from '$lib/components/icons/WarningIcon.svelte';
	import WifiIcon from '$lib/components/icons/WifiIcon.svelte';
	import type { Room } from '$lib/database/schema';
	import { toast } from '@zerodevx/svelte-toast';
	import { toastOpts } from '$lib/toast';
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui';
	import PageTitle from '../../../renter/listings/PageTitle.svelte';

	export let data;
	$: house = data.house;

	$: maxRoomPrice = Math.max(...house.rooms.map((r) => r.price));
	$: minRoomPrice = Math.min(...house.rooms.map((r) => r.price));
	$: numOfBathrooms = house.commonAreas
		.map((a) => a.name.toLowerCase())
		.filter((a) => a.includes('bath') || a.includes('toilet')).length;
	$: numOfRooms = house.rooms.length;
	$: numOfAvailableRooms = house.rooms.filter((room) => room.contracts.length === 0).length;

	let selectedRoom: Room | undefined;
	let showReserveRoomDialog: () => void;
	async function reserveRoom() {
		if (selectedRoom === undefined) return 'fail';

		const res = await fetch('/api/v1/contracts', {
			method: 'POST',
			body: JSON.stringify({ roomId: selectedRoom.id })
		});

		if (!res.ok) {
			const reason = (await res.json()).message;
			toast.push(`Error reserving room! ${reason}`, toastOpts.error);
			return 'fail';
		}

		toast.push('Successfully reserved room!', toastOpts.success);
		selectedRoom = undefined;
		return 'ok';
	}
</script>

<PageTitle>
	{house.name}
</PageTitle>

<!-- Description/Info and location notes -->
<section class="prose prose-invert prose-h2:font-light prose-h2:text-stone-300">
	<h2 class="">{house.region} / {house.district}</h2>
	<img src={house.image_url} alt="house_banner" class="rounded border border-stone-600" />
	<div class="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
		<p class="m-auto space-x-10">
			<PriceTagIcon class="mr-2" />
			{minRoomPrice} - {maxRoomPrice} Euro
		</p>
		<p class="m-auto"><ShowerIcon class="mr-2" /> {numOfBathrooms} washrooms</p>
		<p class="m-auto"><BedIcon class="mr-2" /> {numOfAvailableRooms} / {numOfRooms} bedrooms</p>
		<p class="m-auto"><WifiIcon class="mr-2" /> {house.wifi_speed} Mb/s</p>
	</div>

	<p>{house.location_description}</p>

	{#if house.houseLocationNotes.length !== 0}
		<div class="not-prose my-2 rounded border border-dashed border-sky-300 px-2 py-1 text-sky-400">
			<p>Important location notes:</p>
			{#each house.houseLocationNotes as note (note.id)}
				<p><WarningIcon /> {note.note}</p>
			{/each}
		</div>
	{/if}
</section>

<!-- Common Areas -->
<section>
	<h2 class="mt-5 pb-4 text-2xl">Common areas:</h2>
	<div class="max-w-2xl">
		<TabGroup>
			<TabList class="flex flex-wrap gap-3">
				{#each house.commonAreas as commonArea (commonArea.id)}
					<Tab
						class={({ selected }) =>
							`rounded border px-2 py-1 hover:bg-stone-500 hover:bg-opacity-20 ${
								selected ? 'bg-stone-600 text-white' : 'tab-unselected'
							}`}>{commonArea.name}</Tab
					>
				{/each}
			</TabList>
			<TabPanels class="my-4 overflow-auto">
				{#each house.commonAreas as commonArea (commonArea.id)}
					<TabPanel>
						<div class="flex flex-wrap gap-3">
							{#each commonArea.images as image (image.id)}
								<div
									class="group relative flex max-w-xs items-start justify-end overflow-hidden rounded border shadow"
								>
									<img class="aspect-[16/14]" src={image.url} alt="common area image{image.id}" />
								</div>
							{/each}
						</div>
					</TabPanel>
				{/each}
			</TabPanels>
		</TabGroup>
	</div>
</section>

<!-- Rooms -->
<section>
	<h2 class="mt-5 pb-4 text-2xl">Rooms:</h2>
	<ActionDialog
		bind:showModal={showReserveRoomDialog}
		variant="positive"
		confirmText="Reserve"
		confirmingText="Reserving..."
		confirmAction={() => reserveRoom()}
	>
		{#if selectedRoom}
			Reserve room no. {selectedRoom.number} for {selectedRoom.price} eur/month?
		{/if}
	</ActionDialog>

	<TabGroup>
		<TabList class="flex flex-wrap gap-3">
			{#each house.rooms as room (room.id)}
				{@const roomNotAvailable = room.contracts.length !== 0}
				<Tab
					disabled={roomNotAvailable}
					class={({ selected }) =>
						`rounded border px-2 py-1 hover:bg-stone-500 hover:bg-opacity-20 disabled:line-through disabled:opacity-50 ${
							selected ? 'bg-stone-600 text-white' : ''
						}`}>No. {room.number}</Tab
				>
			{/each}
		</TabList>
		<TabPanels class="my-4 max-w-2xl">
			{#each house.rooms as room (room.id)}
				{@const roomNotAvailable = room.contracts.length !== 0}
				<TabPanel>
					<div class={roomNotAvailable ? 'border border-dashed opacity-50' : ''}>
						<h3 class="mt-3 flex items-center gap-1 pb-2 text-xl">
							{roomNotAvailable ? '[IN-USE]' : ''} Room No. {room.number} -
							<span class="inline-flex items-center gap-1"
								><PriceTagIcon />{room.price} Euro/month</span
							>
						</h3>
						<p>{room.description}</p>

						<!-- Notes -->
						{#if room.notes.length !== 0}
							<div
								class="my-2 rounded border border-dashed border-sky-300 px-2 py-1 prose-p:text-sky-400"
							>
								<p class="prose prose-invert">Important room notes:</p>
								{#each room.notes as note (note.id)}
									<p class="prose prose-invert"><WarningIcon /> {note.note}</p>
								{/each}
							</div>
						{/if}

						<!-- Images -->
						<div class="mt-4 flex flex-wrap gap-3">
							{#each room.images as image (image.id)}
								<div
									class="group relative flex max-w-xs items-start justify-end overflow-hidden rounded border shadow"
								>
									<img class="aspect-[16/14]" src={image.url} alt="room_image_{image.id}" />
								</div>
							{/each}
						</div>

						{#if !roomNotAvailable}
							<button
								class="mt-6 rounded border px-4 py-2 hover:bg-stone-600 disabled:cursor-not-allowed"
								disabled={roomNotAvailable}
								on:click={() => {
									selectedRoom = room;
									showReserveRoomDialog();
								}}
							>
								Reserve Room No. {room.number}
							</button>
						{/if}
					</div>
				</TabPanel>
			{/each}
		</TabPanels>
	</TabGroup>
</section>

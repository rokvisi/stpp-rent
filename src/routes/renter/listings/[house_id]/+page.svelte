<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte';
	import { houseSchemas } from '$lib/zod_schemas.js';
	import { superForm } from 'sveltekit-superforms/client';
	import NoteManager from './NoteManager.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import ActionDialog from '$lib/components/ActionDialog.svelte';
	import { page } from '$app/stores';
	import { toast } from '@zerodevx/svelte-toast';
	import { toastOpts } from '$lib/toast';
	import { goto } from '$app/navigation';
	import PageTitle from '../PageTitle.svelte';

	export let data;
	$: ({ house } = data);

	let success = false;
	const { form, errors, enhance, message, submitting, constraints, reset } = superForm(
		data.patchHouseForm,
		{
			validators: houseSchemas.patch,
			taintedMessage: null,
			resetForm: false,
			onError({ result }) {
				$message = result.error.message;
				success = false;
			},
			onResult({ result }) {
				if (result.type === 'success') {
					success = true;
					reset();
				}
			}
		}
	);

	let previewImageUrl: string | null | undefined = null;
	function onImageSelect(
		input: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		const file = input.currentTarget.files ? input.currentTarget.files[0] : new Blob();
		var reader = new FileReader();

		reader.onload = (e) => (previewImageUrl = e.target?.result as string);
		reader.readAsDataURL(file);
	}

	let showDeleteHouseModal: () => void;
	async function deleteHouseListing() {
		const res = await fetch(`/api/v1/houses/${$page.params.house_id}`, {
			method: 'DELETE'
		});

		if (!res.ok) {
			toast.push('Error deleting house!', toastOpts.error);
			return 'fail';
		}

		toast.push('Successfully deleted house!', toastOpts.success);
		goto(`/renter/listings`);
		return 'ok';
	}
</script>

<div class="flex flex-col gap-2">
	<PageTitle>Edit house '{house.name}'</PageTitle>

	<!-- House update -->
	<section>
		<h2 class="pb-4 text-2xl">House data:</h2>

		<div class="grid-flow-rows grid grid-cols-1 gap-x-8 md:grid-cols-[auto_1fr]">
			<img
				src={previewImageUrl !== null ? previewImageUrl : house.image_url}
				alt="banner"
				class="min-h-full max-w-md rounded-2xl border bg-red-200"
			/>
			<div class="flex min-w-[320px] max-w-[320px] flex-col gap-3 rounded">
				<form
					class="flex flex-col gap-3"
					action="?/patchHouseData"
					method="POST"
					enctype="multipart/form-data"
					use:enhance
				>
					<div>
						<label for="name">Name</label>
						<input
							id="name"
							name="name"
							type="text"
							class="block w-full rounded border px-1 py-1 text-black"
							bind:value={$form.name}
							aria-invalid={$errors.name ? 'true' : undefined}
						/>
						{#if $errors.name}
							<span class="text-xs italic text-red-300">{$errors.name}</span>
						{/if}
					</div>
					<div>
						<label for="region">Region</label>
						<input
							id="region"
							name="region"
							type="text"
							class="block w-full rounded border px-1 py-1 text-black"
							bind:value={$form.region}
							{...$constraints.region}
							aria-invalid={$errors.region ? 'true' : undefined}
						/>
						{#if $errors.region}
							<span class="text-xs italic text-red-300">{$errors.region}</span>
						{/if}
					</div>
					<div>
						<label for="district">District</label>
						<input
							id="district"
							name="district"
							type="text"
							class="block w-full rounded border px-1 py-1 text-black"
							bind:value={$form.district}
							{...$constraints.district}
							aria-invalid={$errors.district ? 'true' : undefined}
						/>
						{#if $errors.district}
							<span class="text-xs italic text-red-300">{$errors.district}</span>
						{/if}
					</div>
					<div>
						<label for="location_description">Description of the location</label>
						<input
							id="location_description"
							name="location_description"
							type="text"
							class="block w-full rounded border px-1 py-1 text-black"
							bind:value={$form.location_description}
							{...$constraints.location_description}
							aria-invalid={$errors.location_description ? 'true' : undefined}
						/>
						{#if $errors.location_description}
							<span class="text-xs italic text-red-300">{$errors.location_description}</span>
						{/if}
					</div>
					<div>
						<label for="wifi_speed">WiFi Speed (in MBs)</label>
						<input
							id="wifi_speed"
							name="wifi_speed"
							type="number"
							class="block w-full rounded border px-1 py-1 text-black"
							bind:value={$form.wifi_speed}
							{...$constraints.wifi_speed}
							aria-invalid={$errors.wifi_speed ? 'true' : undefined}
						/>
						{#if $errors.wifi_speed}
							<span class="text-xs italic text-red-300">{$errors.wifi_speed}</span>
						{/if}
					</div>
					<div class="flex flex-col gap-2">
						<div>
							<label for="wifi_speed">Banner Image</label>
							<input
								class="block w-full rounded border px-1 py-1"
								type="file"
								name="image"
								accept="image/*"
								on:change={onImageSelect}
							/>
						</div>
					</div>

					<button
						class="w-full rounded border bg-stone-700 py-1 hover:bg-stone-600 disabled:cursor-wait disabled:opacity-40"
						disabled={$submitting}>{$submitting ? 'Please wait...' : 'Update'}</button
					>
				</form>

				{#if $message}
					<p class="w-full rounded border bg-stone-800 p-4 text-red-300">{$message}</p>
				{/if}
				{#if success}
					<p class="w-full rounded border bg-stone-800 p-4 text-green-300">
						Successfully updated house info!
					</p>
				{/if}
			</div>
		</div>
	</section>

	<!-- House location notes -->
	<section>
		<h2 class="mt-5 pb-4 text-2xl">Location notes:</h2>
		<NoteManager {house} />
	</section>

	<!-- Rooms -->
	<section>
		<h2 class="mt-5 pb-4 text-2xl">Rooms:</h2>
		<div class="flex gap-2">
			{#each house.rooms as room (room.id)}
				<button
					class="group relative flex aspect-square w-32 items-start justify-end overflow-hidden rounded border shadow"
				>
					<img
						src={room.images[0]?.url ?? 'https://placehold.co/128'}
						alt="room banner"
						class="absolute left-0 top-0 z-0 h-full w-full"
					/>
					<span
						class="text- z-10 flex aspect-square w-8 items-center justify-center rounded-full border bg-stone-800 text-white drop-shadow-glow-sm"
						>{room.number}</span
					>
					<a
						href="/renter/listings/{house.id}/rooms/{room.id}"
						class="absolute left-0 top-0 z-0 hidden h-full w-full items-center justify-center bg-red-200 group-hover:flex group-hover:bg-stone-700"
					>
						Edit
					</a>
				</button>
			{/each}

			<a
				href="/renter/listings/{house.id}/create-room"
				class="flex aspect-square w-32 items-center justify-center rounded border shadow hover:bg-stone-700"
			>
				<PlusIcon />
			</a>
		</div>
	</section>

	<!-- Common areas -->
	<section>
		<h2 class="mt-5 pb-4 text-2xl">Common areas:</h2>
		<div class="flex gap-2">
			{#each house.commonAreas as commonArea (commonArea.id)}
				<button
					class="group relative flex aspect-square w-32 items-end justify-center overflow-hidden rounded border shadow"
				>
					<img
						src={commonArea.images[0]?.url ?? 'https://placehold.co/128'}
						alt="room banner"
						class="absolute left-0 top-0 z-0 h-full w-full"
					/>
					<span
						class="z-10 w-full overflow-hidden overflow-ellipsis whitespace-nowrap border-t bg-stone-800 px-2 py-1 text-white"
						>{commonArea.name}</span
					>
					<a
						href="/renter/listings/{house.id}/common-areas/{commonArea.id}"
						class="absolute left-0 top-0 z-0 hidden h-full w-full items-center justify-center bg-red-200 group-hover:flex group-hover:bg-stone-700"
					>
						Edit
					</a>
				</button>
			{/each}
			<a
				href="/renter/listings/{house.id}/create-common-area"
				class="flex aspect-square w-32 items-center justify-center rounded border shadow hover:bg-stone-700"
			>
				<PlusIcon />
			</a>
		</div>
	</section>

	<hr class="my-8" />

	<!-- Delete house -->
	<section>
		<ActionDialog
			bind:showModal={showDeleteHouseModal}
			variant="negative"
			confirmText="Delete"
			confirmingText="Deleting..."
			confirmAction={() => deleteHouseListing()}
		>
			Are you sure you want to delete this house listing?
			<p class="italic">(This includes also includes all related objects)</p>
		</ActionDialog>

		<button
			class="shadiw rounded border bg-red-500 px-4 py-2 text-black hover:bg-red-400 disabled:cursor-wait disabled:bg-opacity-50"
			on:click={() => showDeleteHouseModal()}
		>
			DELETE HOUSE LISTING
		</button>
	</section>
</div>

<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte';
	import { roomSchemas } from '$lib/zod_schemas.js';
	import { superForm } from 'sveltekit-superforms/client';
	import NoteManager from './NoteManager.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import XIcon from '$lib/components/icons/XIcon.svelte';
	import { page } from '$app/stores';
	import { toast } from '@zerodevx/svelte-toast';
	import { themes, toastOpts } from '$lib/toast';
	import { goto } from '$app/navigation';
	import PageTitle from '../../../PageTitle.svelte';
	import XMarkIcon from '$lib/components/icons/XMarkIcon.svelte';
	import ActionDialog from '$lib/components/ActionDialog.svelte';

	export let data;
	$: ({ room } = data);

	let success = false;
	const { form, errors, enhance, message, submitting, constraints, reset } = superForm(
		data.patchRoomForm,
		{
			validators: roomSchemas.patch,
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

	let imageUploadSuccess = false;
	const {
		enhance: uploadEnhance,
		message: uploadMessage,
		reset: uploadReset,
		submitting: uploadSubmitting
	} = superForm(data.uploadImageForm, {
		taintedMessage: null,
		resetForm: false,
		onError({ result }) {
			$uploadMessage = result.error.message;
			imageUploadSuccess = false;
		},
		onResult({ result }) {
			if (result.type === 'success') {
				imageUploadSuccess = true;
				uploadReset();
			}
		}
	});

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

	let imageIdForDeletion = -1;
	let showImageDeleteModal: () => void;
	async function deleteRoomImage() {
		const res = await fetch('/api/v1/room-images/', {
			method: 'DELETE',
			body: JSON.stringify({
				image_id: imageIdForDeletion
			})
		});

		if (!res.ok) {
			toast.push('Error deleting image!', toastOpts.error);
			return 'fail';
		}

		toast.push('Successfully deleted image!', toastOpts.success);
		room.images = room.images.filter((i) => i.id !== imageIdForDeletion);
		imageIdForDeletion = -1;
		return 'ok';
	}

	let showRoomDeleteModal: () => void;
	async function deleteRoom() {
		const res = await fetch(`/api/v1/houses/${$page.params.house_id}/rooms/${room.id}`, {
			method: 'DELETE'
		});

		if (!res.ok) {
			toast.push('Error deleting room!', toastOpts.error);
			return 'fail';
		}

		toast.push('Successfully deleted room!', toastOpts.success);
		goto(`/renter/listings/${$page.params.house_id}`);
		return 'ok';
	}
</script>

<PageTitle>Edit room {room.number}</PageTitle>

<div class="flex min-w-[320px] max-w-[320px] flex-col gap-3">
	<form
		class="flex flex-col gap-3"
		action="?/patchRoom"
		method="POST"
		enctype="multipart/form-data"
		use:enhance
	>
		<div>
			<label for="number">Room number</label>
			<input
				id="number"
				name="number"
				type="number"
				class="block w-full rounded border px-1 py-1 text-black"
				bind:value={$form.number}
				aria-invalid={$errors.number ? 'true' : undefined}
			/>
			{#if $errors.number}
				<span class="text-xs italic text-red-300">{$errors.number}</span>
			{/if}
		</div>
		<div>
			<label for="price">Price (EUR/month)</label>
			<input
				id="price"
				name="price"
				type="number"
				class="block w-full rounded border px-1 py-1 text-black"
				bind:value={$form.price}
				{...$constraints.price}
				aria-invalid={$errors.price ? 'true' : undefined}
			/>
			{#if $errors.price}
				<span class="text-xs italic text-red-300">{$errors.price}</span>
			{/if}
		</div>
		<div>
			<label for="description">Description</label>
			<input
				id="description"
				name="description"
				type="text"
				placeholder="Room description..."
				class="block w-full rounded border px-1 py-1 text-black"
				bind:value={$form.description}
				{...$constraints.description}
				aria-invalid={$errors.description ? 'true' : undefined}
			/>
			{#if $errors.description}
				<span class="text-xs italic text-red-300">{$errors.description}</span>
			{/if}
		</div>

		<button
			class="w-full rounded border bg-stone-700 py-1 hover:bg-stone-600 disabled:cursor-wait disabled:opacity-40"
			disabled={$submitting}>{$submitting ? 'Please wait...' : 'Update room'}</button
		>
	</form>

	{#if $message}
		<p class="w-full rounded border bg-stone-800 p-4 text-red-300">{$message}</p>
	{/if}
	{#if success}
		<p class="w-full rounded border bg-stone-800 p-4 text-green-300">Successfully updated room!</p>
	{/if}
</div>

<section>
	<h2 class="mt-5 pb-4 text-2xl">Room notes:</h2>
	<NoteManager {room} />
</section>

<section>
	<h2 class="mt-5 pb-4 text-2xl">Room images:</h2>
	<ActionDialog
		bind:showModal={showImageDeleteModal}
		variant="negative"
		confirmText="Delete"
		confirmingText="Deleting..."
		confirmAction={() => deleteRoomImage()}
	>
		Are you sure you want to delete this image?
	</ActionDialog>

	<div class="mb-8 flex flex-wrap gap-4">
		{#each room.images as image (image.id)}
			<div class="group relative">
				<img class="max-w-xs rounded border shadow" src={image.url} alt="" />
				<button
					class="absolute right-0 top-0 hidden rounded-full p-2 text-red-800 opacity-50 hover:opacity-100 group-hover:inline-block"
					on:click={() => {
						imageIdForDeletion = image.id;
						showImageDeleteModal();
					}}><XMarkIcon /></button
				>
			</div>
		{/each}
	</div>

	<form
		class="flex max-w-xs flex-col gap-3"
		action="?/uploadImage"
		method="POST"
		enctype="multipart/form-data"
		use:uploadEnhance
	>
		<div class="flex flex-col gap-2">
			<div>
				<input
					id="image"
					class="block w-full rounded border px-1 py-1"
					type="file"
					name="image"
					accept="image/*"
					required
					on:change={onImageSelect}
				/>
			</div>

			{#if previewImageUrl !== null}
				<img class="max-w-xs rounded border shadow" src={previewImageUrl} alt="Banner preview" />
			{/if}
		</div>
		<button
			class="w-full min-w-[320px] rounded border bg-stone-800 py-1 hover:bg-stone-700 disabled:cursor-wait disabled:opacity-40"
			disabled={$uploadSubmitting}
		>
			{#if $uploadSubmitting}
				<p>Uploading...</p>
			{:else}
				<PlusIcon />
				<span>Upload image</span>
			{/if}
		</button>

		{#if $uploadMessage}
			<p class="w-full rounded border bg-stone-800 p-4 text-red-300">{$uploadMessage}</p>
		{/if}
		{#if imageUploadSuccess}
			<p class="w-full rounded border bg-stone-800 p-4 text-green-300">
				Successfully uploaded image!
			</p>
		{/if}
	</form>
</section>

<hr class="my-8" />

<section>
	<ActionDialog
		bind:showModal={showRoomDeleteModal}
		variant="negative"
		confirmText="Delete"
		confirmingText="Deleting..."
		confirmAction={() => deleteRoom()}
	>
		Are you sure you want to delete this room?
	</ActionDialog>

	<button
		class="shadiw rounded border bg-red-500 px-4 py-2 text-black hover:bg-red-400 disabled:cursor-wait disabled:bg-opacity-50"
		on:click={showRoomDeleteModal}
	>
		DELETE ROOM
	</button>
</section>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ActionDialog from '$lib/components/ActionDialog.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import XMarkIcon from '$lib/components/icons/XMarkIcon.svelte';
	import { toastOpts } from '$lib/toast.js';
	import { commonAreaSchemas } from '$lib/zod_schemas.js';
	import { toast } from '@zerodevx/svelte-toast';
	import { superForm } from 'sveltekit-superforms/client';
	import PageTitle from '../../../PageTitle.svelte';

	export let data;
	$: ({ area } = data);

	let success = false;
	const { form, errors, enhance, message, submitting, constraints, reset } = superForm(
		data.patchAreaForm,
		{
			validators: commonAreaSchemas.patch,
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
				previewImageUrl = null;
				imageInputEl.value = '';
				uploadReset();
			}
		}
	});

	let previewImageUrl: string | null | undefined = null;
	let imageInputEl: HTMLInputElement;
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
	async function deleteCommonAreaImage() {
		const res = await fetch('/api/v1/common-area-images/', {
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
		area.images = area.images.filter((i) => i.id !== imageIdForDeletion);
		imageIdForDeletion = -1;
		return 'ok';
	}

	let showCommonAreaDeleteModal: () => void;
	async function deleteCommonArea() {
		const res = await fetch(`/api/v1/houses/${$page.params.house_id}/common-areas/${area.id}`, {
			method: 'DELETE'
		});

		if (!res.ok) {
			toast.push('Error deleting common area!', toastOpts.error);
			return 'fail';
		}

		toast.push('Successfully deleted common area!', toastOpts.success);
		goto(`/renter/listings/${$page.params.house_id}`);
		return 'ok';
	}
</script>

<PageTitle>Edit common area {area.name}</PageTitle>
<div class="flex min-w-[320px] max-w-[320px] flex-col gap-3">
	<form
		class="flex flex-col gap-3"
		action="?/patchArea"
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
				placeholder="Room name..."
				class="block w-full rounded border bg-neutral-300 px-1 py-1 text-neutral-950 placeholder:text-stone-800"
				bind:value={$form.name}
				{...$constraints.name}
				aria-invalid={$errors.name ? 'true' : undefined}
			/>
			{#if $errors.name}
				<span class="text-xs italic text-red-300">{$errors.name}</span>
			{/if}
		</div>

		<button
			class="w-full rounded border bg-stone-700 py-1 hover:bg-stone-600 disabled:cursor-wait disabled:opacity-40"
			disabled={$submitting}>{$submitting ? 'Please wait...' : 'Update common area'}</button
		>
	</form>

	{#if $message}
		<p class="w-full rounded border bg-stone-800 p-4 text-red-300">{$message}</p>
	{/if}
	{#if success}
		<p class="w-full rounded border bg-stone-800 p-4 text-green-300">
			Successfully updated common area!
		</p>
	{/if}
</div>

<section>
	<h2 class="mt-5 pb-4 text-2xl">Common area images:</h2>
	<ActionDialog
		bind:showModal={showImageDeleteModal}
		variant="negative"
		confirmText="Delete"
		confirmingText="Deleting..."
		confirmAction={() => deleteCommonAreaImage()}
	>
		Are you sure you want to delete this image?
	</ActionDialog>

	<div class="mb-8 flex flex-wrap gap-4">
		{#each area.images as image (image.id)}
			<div class="group relative flex max-w-sm">
				<img class="aspect-[4/3] rounded border shadow" src={image.url} alt="" />
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
					bind:this={imageInputEl}
					id="image"
					class="block w-full rounded border px-1 py-1"
					type="file"
					name="image"
					required
					accept="image/*"
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
		bind:showModal={showCommonAreaDeleteModal}
		variant="negative"
		confirmText="Delete"
		confirmingText="Deleting..."
		confirmAction={() => deleteCommonArea()}
	>
		Are you sure you want to delete this common area?
	</ActionDialog>

	<button
		class="shadiw rounded border bg-red-500 px-4 py-2 text-black hover:bg-red-400 disabled:cursor-wait disabled:bg-opacity-50"
		on:click={() => showCommonAreaDeleteModal()}
	>
		DELETE COMMON AREA
	</button>
</section>

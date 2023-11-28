<script lang="ts">
	import ActionDialog from '$lib/components/ActionDialog.svelte';
	import { toastOpts } from '$lib/toast';
	import { toast } from '@zerodevx/svelte-toast';

	type Image = { id: number; url: string; type: 'house' | 'room' | 'common-area' };

	export let images: Image[];

	let showImageDeleteModal: () => void;
	let selectedImage: Image;
	async function deleteImage() {
		console.log(selectedImage);

		const res = await fetch(`/api/v1/admin/images/${selectedImage.type}/${selectedImage.id}`, {
			method: 'DELETE'
		});

		if (!res.ok) {
			toast.push('Error deleting image!', toastOpts.error);
			return 'fail';
		}

		toast.push('Successfully deleted image!', toastOpts.success);
		images = images.filter((i) => i.id !== selectedImage.id);
		return 'ok';
	}
</script>

<ActionDialog
	bind:showModal={showImageDeleteModal}
	variant="negative"
	confirmText="Delete"
	confirmingText="Deleting..."
	confirmAction={() => deleteImage()}
>
	Are you sure you want to delete this image?
	{#if selectedImage}
		<img class="w-full max-w-xl" src={selectedImage.url} alt="expanded image {selectedImage.id}" />
	{/if}
</ActionDialog>
<div class="flex flex-wrap gap-4 sm:gap-10">
	{#each images as image (image.id)}
		<div
			class="group relative flex aspect-square w-28 items-start justify-end overflow-hidden rounded border shadow sm:w-36 xl:w-64"
		>
			<img
				class="absolute left-0 top-0 h-full w-full"
				src={image.url}
				alt="{image.type} image {image.id}"
			/>
			<div
				class="absolute left-0 top-0 hidden h-full w-full items-center justify-center group-hover:flex group-hover:bg-stone-700"
			>
				<button
					class="rounded border bg-red-700 px-8 py-3 hover:bg-red-500"
					on:click={() => {
						selectedImage = image;
						showImageDeleteModal();
					}}
				>
					Delete
				</button>
			</div>
			<!-- <div class="absolute bottom-0 right-0 flex h-full w-full items-end justify-center sm:hidden">
				<button
					class="w-full rounded border bg-red-600 px-2 py-1 active:bg-red-400"
					on:click={() => {
						selectedImage = image;
						showImageDeleteModal();
					}}
				>
					Delete
				</button>
			</div> -->
		</div>
	{/each}
</div>

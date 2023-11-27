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

<div class="grid grid-cols-5 gap-4">
	<ActionDialog
		bind:showModal={showImageDeleteModal}
		variant="negative"
		confirmText="Delete"
		confirmingText="Deleting..."
		confirmAction={() => deleteImage()}
	>
		Are you sure you want to delete this image?
		{#if selectedImage}
			<img class="max-w-xl" src={selectedImage.url} alt="expanded image {selectedImage.id}" />
		{/if}
	</ActionDialog>
	{#each images as image (image.id)}
		<div
			class="group relative flex aspect-square w-64 items-start justify-end overflow-hidden rounded border shadow"
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
					class="rounded border bg-red-700 px-4 py-2 hover:bg-red-500"
					on:click={() => {
						selectedImage = image;
						showImageDeleteModal();
					}}
				>
					Delete
				</button>
			</div>
		</div>
	{/each}
</div>

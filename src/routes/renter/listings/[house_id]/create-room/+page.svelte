<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte';
	import { roomSchemas } from '$lib/zod_schemas';
	import { superForm } from 'sveltekit-superforms/client';
	import PageTitle from '../../PageTitle.svelte';

	export let data;

	let success = false;
	const { form, errors, enhance, message, submitting, constraints, reset } = superForm(
		data.postRoomForm,
		{
			validators: roomSchemas.post,
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
</script>

<PageTitle>Create a room</PageTitle>
<div class="flex min-w-[320px] max-w-[320px] flex-col gap-3">
	<form
		class="flex flex-col gap-3"
		action="?/createRoom"
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
			disabled={$submitting}>{$submitting ? 'Please wait...' : 'Create room'}</button
		>
	</form>

	{#if $message}
		<p class="w-full rounded border bg-stone-800 p-4 text-red-300">{$message}</p>
	{/if}
	{#if success}
		<p class="w-full rounded border bg-stone-800 p-4 text-green-300">Successfully created room!</p>
	{/if}
</div>

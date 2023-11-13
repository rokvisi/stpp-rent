<script lang="ts">
	import { houseSchemas } from '$lib/zod_schemas.js';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	const { form, errors, enhance, message, submitting, constraints, reset } = superForm(
		data.authForm,
		{
			validators: houseSchemas.post,
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

	let success = false;
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
</script>

<h1 class="pb-4 text-5xl">List a house up for rent</h1>
<div class="flex max-w-xs flex-col gap-3">
	<form
		class="flex flex-col gap-3"
		action="/api/v1/houses"
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
			{#if $errors.name}<span class="text-xs italic text-red-300">{$errors.name}</span>{/if}
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
			{#if $errors.region}<span class="text-xs italic text-red-300">{$errors.region}</span>{/if}
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
			{#if $errors.district}<span class="text-xs italic text-red-300">{$errors.district}</span>{/if}
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
			{#if $errors.location_description}<span class="text-xs italic text-red-300"
					>{$errors.location_description}</span
				>{/if}
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
			{#if $errors.wifi_speed}<span class="text-xs italic text-red-300">{$errors.wifi_speed}</span
				>{/if}
		</div>
		<div class="flex flex-col gap-2">
			<div>
				<label for="wifi_speed">Banner Image</label>
				<input
					class="block w-full rounded border px-1 py-1"
					type="file"
					name="image"
					required
					on:change={onImageSelect}
				/>
			</div>

			{#if previewImageUrl !== null}
				<img class="inline-block rounded" src={previewImageUrl} alt="Banner preview" />
			{/if}
		</div>

		<button
			class="w-full rounded border bg-stone-700 py-1 hover:bg-stone-600 disabled:cursor-wait disabled:opacity-40"
			disabled={$submitting}>{$submitting ? 'Please wait...' : 'Create listing'}</button
		>
	</form>

	{#if $message}
		<p class="w-full rounded border bg-stone-800 p-4 text-red-300">{$message}</p>
	{/if}
	{#if success}
		<p class="w-full rounded border bg-stone-800 p-4 text-green-300">
			Successfully created listing!
		</p>
	{/if}
</div>

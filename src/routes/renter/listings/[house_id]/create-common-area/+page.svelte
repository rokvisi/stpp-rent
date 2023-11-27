<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte';
	import { commonAreaSchemas, roomSchemas } from '$lib/zod_schemas';
	import { superForm } from 'sveltekit-superforms/client';
	import PageTitle from '../../PageTitle.svelte';

	export let data;

	let success = false;
	const { form, errors, enhance, message, submitting, constraints, reset } = superForm(
		data.postCommonAreaForm,
		{
			validators: commonAreaSchemas.post,
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

<PageTitle>Create a common area</PageTitle>
<div class="flex min-w-[320px] max-w-[320px] flex-col gap-3">
	<form
		class="flex flex-col gap-3"
		action="?/createRoom"
		method="POST"
		enctype="multipart/form-data"
		use:enhance
	>
		<div>
			<label for="description">Area name</label>
			<input
				id="name"
				name="name"
				type="text"
				placeholder="Common area name..."
				class="block w-full rounded border px-1 py-1 text-black"
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
			disabled={$submitting}>{$submitting ? 'Please wait...' : 'Create common area'}</button
		>
	</form>

	{#if $message}
		<p class="w-full rounded border bg-stone-800 p-4 text-red-300">{$message}</p>
	{/if}
	{#if success}
		<p class="w-full rounded border bg-stone-800 p-4 text-green-300">
			Successfully created common area!
		</p>
	{/if}
</div>

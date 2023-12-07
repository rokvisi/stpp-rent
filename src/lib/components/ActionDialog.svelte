<script lang="ts">
	let modalEl: any;
	let busy: boolean;

	export let variant: 'positive' | 'negative';
	export let confirmText: string;
	export let confirmingText: string;
	export let confirmAction: () => Promise<'ok' | 'fail'>;

	$: action = async () => {
		busy = true;

		const res = await confirmAction();
		if (res === 'fail') {
			//TODO: Handle
			hideModal();
		} else {
			hideModal();
		}

		busy = false;
	};

	export const hideModal: () => void = () => modalEl.close();
	export const showModal: () => void = () => modalEl.showModal();
</script>

<dialog
	bind:this={modalEl}
	class="overflow-auto rounded drop-shadow-glow-2xl transition-all duration-200 backdrop:bg-stone-900 backdrop:bg-opacity-50 backdrop:backdrop-blur-sm"
>
	<div class="flex flex-col gap-6 rounded border bg-stone-600 p-5 shadow drop-shadow-glow-2xl">
		<p class="text-white"><slot /></p>
		<div class="flex items-center justify-between gap-4">
			<button
				class="rounded border bg-stone-500 px-10 py-1 shadow hover:bg-stone-400 disabled:cursor-not-allowed disabled:bg-opacity-50"
				disabled={busy}
				on:click={hideModal}>Cancel</button
			>
			{#if variant === 'positive'}
				<button
					class="rounded border bg-green-500 px-10 py-1 shadow hover:bg-green-400 disabled:cursor-wait disabled:bg-opacity-50"
					disabled={busy}
					on:click={() => action()}>{busy ? confirmingText : confirmText}</button
				>
			{:else}
				<button
					class="rounded border bg-red-500 px-10 py-1 shadow hover:bg-red-400 disabled:cursor-wait disabled:bg-opacity-50"
					disabled={busy}
					on:click={() => action()}>{busy ? confirmingText : confirmText}</button
				>
			{/if}
		</div>
	</div>
</dialog>

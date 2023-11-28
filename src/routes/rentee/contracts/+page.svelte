<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Accordion from '$lib/components/Accordion.svelte';
	import ActionDialog from '$lib/components/ActionDialog.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';
	import { toastOpts } from '$lib/toast.js';
	import { toast } from '@zerodevx/svelte-toast';

	export let data;
	$: ({ pendingContracts, activeContracts, declinedContracts, completedContracts } = data);

	let showEndContractModal: () => void;
	let selectedContract: (typeof activeContracts)[0];
	async function endContract() {
		const res = await fetch(`/api/v1/contracts/${selectedContract.id}/end`, {
			method: 'PATCH'
		});

		if (!res.ok) {
			toast.push(`Error ending contract! ${(await res.json()).message}`, toastOpts.error);
			return 'fail';
		}

		toast.push(`Successfully ended  contract!`, toastOpts.success);
		await invalidateAll();
		return 'ok';
	}
</script>

<ActionDialog
	bind:showModal={showEndContractModal}
	variant="positive"
	confirmText="End contract"
	confirmingText="Ending..."
	confirmAction={() => endContract()}
>
	Are you sure you want to end this contract?
</ActionDialog>

<div class="flex flex-col gap-2">
	<PageHeading>My room contracts</PageHeading>
	{#if pendingContracts.length === 0 && activeContracts.length === 0 && declinedContracts.length === 0 && completedContracts.length === 0}
		<h2 class="text-xl">You have no contracts at this moment.</h2>
	{:else}
		<div class="flex flex-col gap-4">
			<!-- Active -->
			{#if activeContracts.length !== 0}
				<Accordion title="Active contracts:" opened={true}>
					<div class="flex flex-wrap gap-4">
						{#each activeContracts as contract (contract.id)}
							<div class="inline-flex gap-4 rounded border border-t-4 border-stone-600 p-4">
								<img
									class="inline-block aspect-square max-w-[160px] rounded-sm"
									src={contract.room.images[0]?.url ?? ''}
									alt="room_image_{contract.id}"
								/>
								<div class="flex flex-col justify-between gap-4">
									<div>
										<p class="font-medium">
											{contract.room.house.name} -> Room no. {contract.room.number}
										</p>
										<p class="font-light">{contract.room.price} eur / month</p>
										<p class="uppercase text-green-400">Active</p>
									</div>

									<div>
										<a
											class="mb-2 block rounded border px-2 py-1 text-center"
											href="/rentee/houses/{contract.room.house.id}">View house</a
										>
										<button
											class="w-full rounded border bg-red-600 px-10 py-1"
											on:click={() => {
												selectedContract = contract;
												showEndContractModal();
											}}>End stay</button
										>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</Accordion>
			{/if}

			<!-- Pending -->
			{#if pendingContracts.length !== 0}
				<Accordion title="Pending contracts:" opened={true}>
					<div class="flex flex-wrap gap-4">
						{#each pendingContracts as contract (contract.id)}
							<div class="inline-flex gap-4 rounded border border-t-4 border-stone-600 p-4">
								<img
									class="inline-block aspect-square max-w-[160px] rounded-sm"
									src={contract.room.images[0]?.url ?? ''}
									alt="room_image_{contract.id}"
								/>
								<div class="flex flex-col justify-between gap-4">
									<div>
										<p class="font-medium">
											{contract.room.house.name} -> Room no. {contract.room.number}
										</p>
										<p class="font-light">{contract.room.price} eur / month</p>
										<p class="uppercase text-orange-400">Pending</p>
									</div>

									<div>
										<a
											class="block rounded border px-2 py-1 text-center"
											href="/rentee/houses/{contract.room.house.id}">View house</a
										>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</Accordion>
			{/if}

			<!-- Declined -->
			{#if declinedContracts.length !== 0}
				<Accordion title="Declined contracts:">
					<div class="flex flex-wrap gap-4">
						{#each declinedContracts as contract (contract.id)}
							<div class="inline-flex gap-4 rounded border border-t-4 border-stone-600 p-4">
								<img
									class="inline-block aspect-square max-w-[160px] rounded-sm"
									src={contract.room.images[0]?.url ?? ''}
									alt="room_image_{contract.id}"
								/>
								<div class="flex flex-col justify-between gap-4">
									<div>
										<p class="font-medium">
											{contract.room.house.name} -> Room no. {contract.room.number}
										</p>
										<p class="font-light">{contract.room.price} eur / month</p>
										<p class="uppercase text-red-400">Declined</p>
									</div>

									<div>
										<a
											class="block rounded border px-2 py-1 text-center"
											href="/rentee/houses/{contract.room.house.id}">View house</a
										>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</Accordion>
			{/if}

			<!-- Completed -->
			{#if completedContracts.length !== 0}
				<Accordion title="Completed contracts:">
					<div class="flex flex-wrap gap-4">
						{#each completedContracts as contract (contract.id)}
							<div class="inline-flex gap-4 rounded border border-t-4 border-stone-600 p-4">
								<img
									class="inline-block aspect-square max-w-[160px] rounded-sm"
									src={contract.room.images[0]?.url ?? ''}
									alt="room_image_{contract.id}"
								/>
								<div class="flex flex-col justify-between gap-4">
									<div>
										<p class="font-medium">
											{contract.room.house.name} -> Room no. {contract.room.number}
										</p>
										<p class="font-light">{contract.room.price} eur / month</p>
										<p class="uppercase text-blue-400">Completed</p>
									</div>

									<div>
										<a
											class="block rounded border px-2 py-1 text-center"
											href="/rentee/houses/{contract.room.house.id}">View house</a
										>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</Accordion>
			{/if}
		</div>
	{/if}
</div>

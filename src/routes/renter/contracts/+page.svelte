<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Accordion from '$lib/components/Accordion.svelte';
	import ActionDialog from '$lib/components/ActionDialog.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';
	import ProfileIcon from '$lib/components/icons/ProfileIcon.svelte';
	import type { Contract } from '$lib/database/schema.js';
	import { toastOpts } from '$lib/toast.js';
	import { toast } from '@zerodevx/svelte-toast';
	import { tick } from 'svelte';

	export let data;

	$: pendingContracts = data.contracts.filter(
		(c) => c.declined === false && c.start_date === null && c.end_date === null
	);
	$: activeContracts = data.contracts.filter(
		(c) => c.declined === false && c.start_date !== null && c.end_date === null
	);
	$: declinedContracts = data.contracts.filter((c) => c.declined === true);
	$: completedContracts = data.contracts.filter(
		(c) => c.declined === false && c.end_date !== null && c.end_date !== null
	);

	let showActOnContractModal: () => void;
	let selectedAction: 'accept' | 'decline';
	let selectedContract: Contract | undefined;
	async function actOnContractOffer() {
		const res = await fetch(`/api/v1/contracts/${selectedContract?.id}`, {
			body: JSON.stringify({
				action: selectedAction
			}),
			method: 'PATCH'
		});

		if (!res.ok) {
			toast.push(
				`Error ${selectedAction === 'accept' ? 'accepting' : 'declining'}  contract!`,
				toastOpts.error
			);
			return 'fail';
		}

		toast.push(
			`Successfully ${selectedAction === 'accept' ? 'accepted' : 'declined'}  contract!`,
			toastOpts.success
		);
		await invalidateAll();
		return 'ok';
	}
</script>

{#if selectedContract && selectedAction}
	{#key selectedContract}
		<ActionDialog
			bind:showModal={showActOnContractModal}
			variant={selectedAction === 'accept' ? 'positive' : 'negative'}
			confirmText={selectedAction === 'accept' ? 'Accept' : 'Decline'}
			confirmingText={selectedAction === 'accept' ? 'Accepting...' : 'Declining...'}
			confirmAction={() => actOnContractOffer()}
		>
			{selectedAction === 'accept'
				? `Are you sure you want to accept this contract?`
				: `Are you sure you want to decline this contract?`}
			{#if selectedAction === 'accept'}
				<p class="italic">(This will decline all other pending contracts for the same room)</p>
			{/if}
		</ActionDialog>
	{/key}
{/if}

<div class="flex flex-col gap-2">
	<PageHeading>My room contracts</PageHeading>

	{#if data.contracts.length === 0}
		<h2 class="text-xl">You have no contracts at this moment.</h2>
	{:else}
		<div class="flex flex-col gap-4">
			<!-- Pending -->
			{#if pendingContracts.length !== 0}
				<Accordion title="Pending contracts:" opened={true}>
					<div class="flex flex-wrap gap-4">
						{#each pendingContracts as contract (contract.id)}
							<div class="inline-flex gap-4 rounded border border-t-4 border-stone-600 p-4">
								<img
									class="inline-block aspect-square max-w-[160px] rounded-sm"
									src={contract.images[0]?.url ?? ''}
									alt="room_image_{contract.id}"
								/>
								<div class="flex flex-col justify-between gap-4">
									<div>
										<p class="font-medium">
											{contract.house.name} -> Room no. {contract.room.number}
										</p>
										<p class="font-light">{contract.room.price} eur / month</p>
										<p class="uppercase text-orange-400">Pending</p>
										<p><ProfileIcon /> {contract.rentee.username}</p>
									</div>

									<div>
										<a
											class="mb-3 block rounded border px-2 py-1 text-center hover:bg-zinc-800"
											href="/renter/listings/{contract.house.id}">View house</a
										>
										<div class="flex flex-wrap items-center justify-between gap-2">
											<button
												class="block grow rounded border bg-red-600 px-10 py-1 hover:bg-red-500"
												on:click={async () => {
													selectedContract = undefined;
													selectedContract = contract;
													selectedAction = 'decline';
													await tick();
													showActOnContractModal();
												}}>Decline</button
											>
											<button
												class="block grow rounded border bg-green-600 px-10 py-1 hover:bg-green-500"
												on:click={async () => {
													selectedContract = undefined;
													selectedContract = contract;
													selectedAction = 'accept';
													await tick();
													showActOnContractModal();
												}}>Accept</button
											>
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</Accordion>
			{/if}

			<!-- Active -->
			{#if activeContracts.length !== 0}
				<Accordion title="Active contracts:">
					<div class="flex flex-wrap gap-4">
						{#each activeContracts as contract (contract.id)}
							<div class="inline-flex gap-4 rounded border border-t-4 border-stone-600 p-4">
								<img
									class="inline-block aspect-square max-w-[160px] rounded-sm"
									src={contract.images[0]?.url ?? ''}
									alt="room_image_{contract.id}"
								/>
								<div class="flex flex-col justify-between gap-4">
									<div>
										<p class="font-medium">
											{contract.house.name} -> Room no. {contract.room.number}
										</p>
										<p class="font-light">{contract.room.price} eur / month</p>
										<p class="uppercase text-green-400">Active</p>
										<p><ProfileIcon /> {contract.rentee.username}</p>
									</div>

									<div>
										<a
											class="mb-2 block rounded border px-2 py-1 text-center hover:bg-zinc-800"
											href="/renter/listings/{contract.house.id}">View house</a
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
									src={contract.images[0]?.url ?? ''}
									alt="room_image_{contract.id}"
								/>
								<div class="flex flex-col justify-between gap-4">
									<div>
										<p class="font-medium">
											{contract.house.name} -> Room no. {contract.room.number}
										</p>
										<p class="font-light">{contract.room.price} eur / month</p>
										<p class="uppercase text-red-400">Declined</p>
										<p><ProfileIcon /> {contract.rentee.username}</p>
									</div>

									<div>
										<a
											class="mb-2 block rounded border px-2 py-1 text-center hover:bg-zinc-800"
											href="/renter/listings/{contract.house.id}">View house</a
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
									src={contract.images[0]?.url ?? ''}
									alt="room_image_{contract.id}"
								/>
								<div class="flex flex-col justify-between gap-4">
									<div>
										<p class="font-medium">
											{contract.house.name} -> Room no. {contract.room.number}
										</p>
										<p class="font-light">{contract.room.price} eur / month</p>
										<p class="uppercase text-blue-400">Completed</p>
										<p><ProfileIcon /> {contract.rentee.username}</p>
									</div>

									<div>
										<a
											class="mb-2 block rounded border px-2 py-1 text-center hover:bg-zinc-800"
											href="/renter/listings/{contract.house.id}">View house</a
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

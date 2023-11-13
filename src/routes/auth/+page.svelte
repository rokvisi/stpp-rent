<script lang="ts">
	import { authSchemas } from '$lib/zod_schemas';
	import { tick } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	export let formEl: HTMLFormElement;
	const { form, errors, enhance, message, submitting, constraints } = superForm(data.authForm, {
		validators: authSchemas.register,
		taintedMessage: null,
		resetForm: false
	});
</script>

<h1 class="pb-4 text-5xl">Auth page</h1>
<div class="flex max-w-xs flex-col gap-3">
	<form bind:this={formEl} method="POST" class="flex flex-col gap-3" use:enhance>
		<div>
			<label for="username">username</label>
			<input
				id="username"
				name="username"
				type="text"
				class="block w-full rounded border px-1 py-1 text-black"
				bind:value={$form.username}
				{...$constraints.username}
				aria-invalid={$errors.username ? 'true' : undefined}
			/>
			{#if $errors.username}<span class="text-xs italic text-red-300">{$errors.username}</span>{/if}
		</div>

		<div>
			<label for="password">password</label>
			<input
				id="password"
				name="password"
				type="password"
				class="w-full rounded border px-1 py-1 text-black"
				bind:value={$form.password}
				{...$constraints.password}
				aria-invalid={$errors.password ? 'true' : undefined}
			/>
			{#if $errors.password}<span class="text-xs italic text-red-300">{$errors.password}</span>{/if}
		</div>

		<div class="flex flex-col rounded border bg-zinc-800 p-2 shadow">
			<div
				class="col-span-full mb-2 w-full rounded border border-dashed border-orange-300 bg-opacity-40 p-2"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="mr-1 inline-block h-5 w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
					/>
				</svg>

				<p class="inline-block text-sm font-extralight text-orange-300">
					Only matters when registering!
				</p>
			</div>
			<p>Account type:</p>
			<div class="mb-1 flex items-center gap-2">
				<input
					type="radio"
					id="rentee"
					name="role"
					value="rentee"
					bind:group={$form.role}
					{...$constraints.role}
				/>
				<label for="rentee">rentee <span class="text-xs italic">(buy a room)</span></label>
			</div>
			<div class="mb-1 flex items-center gap-2">
				<input
					type="radio"
					id="renter"
					name="role"
					value="renter"
					bind:group={$form.role}
					{...$constraints.role}
				/>
				<label for="renter">renter <span class="text-xs italic">(sell a room)</span></label>
			</div>
			<div class="flex items-center gap-2">
				<input
					type="radio"
					id="admin"
					name="role"
					value="admin"
					bind:group={$form.role}
					{...$constraints.role}
				/>
				<label for="admin"
					>admin <span class="text-xs italic">(only available during development)</span></label
				>
			</div>
			{#if $errors.role}<span class="text-xs italic text-red-300">{$errors.role}</span>{/if}
		</div>

		<div class="flex justify-between gap-4">
			<button
				formaction="?/register"
				class="w-full rounded border bg-stone-700 py-1 hover:bg-stone-600 disabled:cursor-wait disabled:opacity-40"
				disabled={$submitting}>Register</button
			>
			<button
				formaction="?/login"
				class="w-full rounded border bg-stone-700 py-1 hover:bg-stone-600 disabled:cursor-wait disabled:opacity-40"
				disabled={$submitting}>Login</button
			>
		</div>
	</form>
	{#if $message}
		<p class="w-full rounded border bg-stone-800 p-4 text-red-300">{$message}</p>
	{/if}

	<div>
		<p class="mb-1">Click to quick-login with test account credentials:</p>
		<div class="space-x-1">
			<button
				class="rounded border border-dashed border-orange-300 bg-stone-800 px-2 py-1 hover:bg-stone-700"
				on:click={async () => {
					$form.username = 'user1';
					$form.password = 'labas123';
					formEl.action = '?/login';
					await tick();
					formEl.submit();
				}}>rentee</button
			>
			<button
				class="rounded border border-dashed border-orange-300 bg-stone-800 px-2 py-1 hover:bg-stone-700"
				on:click={async () => {
					$form.username = 'user2';
					$form.password = 'labas123';
					formEl.action = '?/login';
					await tick();
					formEl.submit();
				}}>renter</button
			>
			<button
				class="rounded border border-dashed border-orange-300 bg-stone-800 px-2 py-1 hover:bg-stone-700"
				on:click={async () => {
					$form.username = 'user3';
					$form.password = 'labas123';
					formEl.action = '?/login';
					await tick();
					formEl.submit();
				}}>admin</button
			>
		</div>
	</div>
</div>

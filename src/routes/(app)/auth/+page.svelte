<script>
	import { authSchemas } from '$lib/zod_schemas';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	const { form, errors, enhance, message, submitting, constraints } = superForm(data.authForm, {
		validators: authSchemas.register,
		taintedMessage: null
	});
</script>

<h1 class="pb-4 text-5xl">Auth page</h1>
<div class="max-w-xs">
	<form method="POST" class="flex flex-col gap-3" use:enhance>
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
			<span class="col-span-full text-sm italic text-blue-400">Only matters when registering!</span>
			<p>role:</p>
			<div class="">
				<input
					type="radio"
					id="rentee"
					name="role"
					value="rentee"
					bind:group={$form.role}
					{...$constraints.role}
				/>
				<label for="rentee">rentee</label>
			</div>
			<div class="">
				<input
					type="radio"
					id="renter"
					name="role"
					value="renter"
					bind:group={$form.role}
					{...$constraints.role}
				/>
				<label for="renter">renter</label>
			</div>
			{#if $errors.role}<span class="text-xs italic text-red-300">{$errors.role}</span>{/if}
		</div>

		<div class="flex justify-between gap-4">
			<button
				formaction="?/register"
				class="w-full rounded border bg-stone-700 py-1 disabled:cursor-wait disabled:bg-stone-400"
				disabled={$submitting}>Register</button
			>
			<button
				formaction="?/login"
				class="w-full rounded border bg-stone-700 py-1 disabled:cursor-wait disabled:bg-stone-400"
				disabled={$submitting}>Login</button
			>
		</div>
	</form>
	{#if $message}<span class="text-xs italic text-red-300">{$message}</span>{/if}
</div>

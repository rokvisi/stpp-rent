<script>
	import { enhance } from '$app/forms';
</script>

<h1 class="pb-4 text-5xl">Auth page</h1>
<div class="max-w-xs">
	<form action="" method="POST" class="flex flex-col gap-2" use:enhance>
		<input
			name="username"
			type="text"
			placeholder="username"
			value="user1"
			class="rounded border px-1 py-1 text-black"
		/>
		<input
			name="password"
			type="password"
			value="labas123"
			placeholder="password"
			class="rounded border px-1 py-1 text-black"
		/>

		<div class="flex justify-between gap-4">
			<button formaction="?/register" class="w-full rounded border bg-stone-700 py-1"
				>Register</button
			>
			<button formaction="?/login" class="w-full rounded border bg-stone-700 py-1">Login</button>
		</div>
	</form>

	<button
		class="rounded border px-2 py-1"
		on:click={async () => await fetch('/api/v1/cook', { method: 'POST' })}>COOKIEEE!</button
	>

	<form action="?/cook" method="POST" use:enhance>
		<button>Cookie222!</button>
	</form>
</div>

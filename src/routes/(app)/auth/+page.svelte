<h1 class="pb-4 text-5xl">Auth page</h1>
<div class="max-w-xs">
	<form action="" method="POST" class="flex flex-col gap-2">
		<input
			name="username"
			type="text"
			placeholder="username"
			value="ddd"
			class="rounded border px-1 py-1 text-black"
		/>
		<input
			name="password"
			type="password"
			value="aaa"
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
</div>

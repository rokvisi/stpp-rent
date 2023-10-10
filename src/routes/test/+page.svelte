<button
	on:click={async () => {
		await fetch('/api/v1/test');
	}}
>
	Run test server function.
</button>

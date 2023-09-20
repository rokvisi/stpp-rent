<script lang="ts">
	import { page } from '$app/stores';
</script>

<section>
	<h1 class="pb-4 text-5xl">404 - Resource not found!</h1>
	<p class="pb-2">
		The requested resource <span class="rounded bg-zinc-800 px-1 font-mono text-red-500"
			>{$page.params.resource}</span
		> does not exists.
	</p>
	<p>Have a look at the siderbar for a list of available resources.</p>
</section>

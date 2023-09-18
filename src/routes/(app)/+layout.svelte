<script>
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="relative grid min-h-screen grid-rows-[auto_1fr_auto]">
	<header class="flex items-center justify-between bg-zinc-800 px-12 py-4 shadow">
		<span class="text-mono text-lg uppercase tracking-wider">Rentee</span>
		<span>TODO Header</span>

		<nav>
			<a href="/docs/api/v1">Docs</a>
		</nav>
	</header>
	<div class="grid grid-cols-[auto_1fr]">
		<main class="px-12 pb-10 pt-20">
			<slot />
		</main>
	</div>
	<Footer />
</div>

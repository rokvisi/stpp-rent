<script>
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="relative grid grid-rows-[auto_1fr_auto] min-h-screen">
	<header class="bg-zinc-800 px-12 flex items-center justify-between shadow py-4">
		<span class="text-lg text-mono uppercase tracking-wider">Rentee</span>
		<span>TODO Header</span>
		<nav>
			<a href="/docs/api/v1">Docs</a>
		</nav>
	</header>
	<div class="grid grid-cols-[auto_1fr]">
		<main class="pt-20 pb-10 px-12">
			<slot />
		</main>
	</div>
	<Footer />
</div>

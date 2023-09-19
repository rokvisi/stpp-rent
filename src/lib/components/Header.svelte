<script lang="ts">
</script>

<header
	class="flex items-center justify-between bg-zinc-800 px-4 py-2 shadow shadow md:px-12 md:py-4"
>
	<span class="text-mono text-lg uppercase tracking-wider">Rentee</span>
	<slot name="title">PAGE TITLE</slot>
	<nav>
		<slot name="nav" />
	</nav>
</header>

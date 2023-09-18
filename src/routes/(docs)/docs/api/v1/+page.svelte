<script lang="ts">
	import { resources } from '$lib/static/test.json';
</script>

<h1>See all available resources</h1>
<section class="flex flex-col">
	{#each resources as resource}
		<div>
			<a href="/docs/api/v1/{resource.resource}">{resource.method} {resource.resource}</a>
		</div>
	{/each}
</section>

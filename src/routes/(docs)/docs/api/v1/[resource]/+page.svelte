<script lang="ts">
	import { page } from '$app/stores';
	import { JsonView } from '@zerodevx/svelte-json-view';

	export let data;
	$: resource = data;
</script>

<div class="flex flex-col gap-4">
	<section>
		<h1 class="text-5xl pb-4">{resource.method} {resource.resource}</h1>
		<p>{resource.description}</p>
	</section>
	<section>
		<h2 class="text-4xl pb-6">Resource URL</h2>
		{#if resource.method === 'GET'}
			<a
				class="text-red-500 font-mono underline underline-offset-4"
				href="{$page.url.origin}/{resource.resource_url}"
				>{$page.url.origin}/{resource.resource_url}</a
			>
		{:else}
			<code class="text-red-500">{$page.url.origin}/{resource.resource_url}</code>
		{/if}
	</section>
	<section>
		<h2 class="text-4xl pb-6">Resource Information</h2>
		<table class="rounded overflow-hidden">
			<tr class="bg-zinc-800 border-b">
				<td class="p-2 border-r">Response formats</td>
				<td class="p-2">{resource.information.response_format}</td>
			</tr>
			<tr class="bg-zinc-700">
				<td class="p-2 border-r">Requires authentication? </td>
				<td class="p-2">{resource.information.requires_auth ? 'Yes' : 'No'}</td>
			</tr>
		</table>
	</section>
	<section>
		<h2 class="text-4xl pb-6">Parameters</h2>
		{#if resource.parameters.length === 0}
			<p>-</p>
		{:else}
			<p>TODO!</p>
		{/if}
	</section>
	<section>
		<h2 class="text-4xl pb-6">Response codes</h2>
		<table class="rounded overflow-hidden">
			<thead>
				<tr class="border-b bg-zinc-800">
					<th class="border-r p-2">Code</th>
					<th class="p-2">Reason</th>
				</tr>
			</thead>
			<tbody>
				{#each resource.responses as response}
					<tr class="odd:bg-zinc-700 even:bg-zinc-800">
						<td class="p-2 border-r">{response.code}</td>
						<td class="p-2">{response.reason}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
	<section>
		<h2 class="text-4xl pb-6">Example Request</h2>
		<code class="text-red-500 bg-zinc-800 p-2 rounded"
			>{resource.method} {$page.url.origin}/{resource.sample_request}</code
		>
	</section>
	<section>
		<h2 class="text-4xl pb-6">Example Response</h2>
		<div class="bg-zinc-700 rounded p-2 font-mono json-wrapper">
			<JsonView json={resource.sample_response} />
		</div>
	</section>
</div>

<style>
	.json-wrapper {
		--jsonPaddingLeft: 2rem;
	}
</style>

<script lang="ts">
	import { page } from '$app/stores';
	import { JsonView } from '@zerodevx/svelte-json-view';

	export let data;
	$: resource = data.resource;
</script>

<div class="flex flex-col gap-4">
	<section>
		<h1 class="pb-4 text-5xl">{resource.resource_group} - {resource.method} {resource.resource}</h1>
		<p>{resource.description}</p>
	</section>
	<section>
		<h2 class="pb-6 text-4xl">Resource URL</h2>
		{#if resource.method === 'GET'}
			<a
				class="font-mono text-red-500 underline underline-offset-4"
				href="{$page.url.origin}/{resource.resource_url}"
				>{$page.url.origin}/{resource.resource_url}</a
			>
		{:else}
			<code class="text-red-500">{$page.url.origin}/{resource.resource_url}</code>
		{/if}
	</section>
	<section>
		<h2 class="pb-6 text-4xl">Resource Information</h2>
		<table class="overflow-hidden rounded">
			<tr class="border-b bg-zinc-800">
				<td class="border-r p-2">Response formats</td>
				<td class="p-2">{resource.information.response_format}</td>
			</tr>
			<tr class="bg-zinc-700">
				<td class="border-r p-2">Requires authentication? </td>
				<td class="p-2">{resource.information.requires_auth ? 'Yes' : 'No'}</td>
			</tr>
		</table>
	</section>
	<section>
		<h2 class="pb-6 text-4xl">Body parameters</h2>
		{#if resource.body_parameters.length === 0}
			<p>-</p>
		{:else}
			<table class="overflow-hidden rounded">
				<thead>
					<tr class="border-b bg-zinc-800">
						<th class="border-r p-2">Name</th>
						<th class="border-r p-2">Required</th>
						<th class="p-2">Description</th>
					</tr>
				</thead>
				<tbody>
					{#each resource.body_parameters as parameter}
						<tr class="odd:bg-zinc-700 even:bg-zinc-800">
							<td class="border-r p-2">{parameter.name}</td>
							<td class="border-r p-2">{parameter.required}</td>
							<td class="p-2">{parameter.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</section>
	<section>
		<h2 class="pb-6 text-4xl">Response codes</h2>
		<table class="overflow-hidden rounded">
			<thead>
				<tr class="border-b bg-zinc-800">
					<th class="border-r p-2">Code</th>
					<th class="p-2">Reason</th>
				</tr>
			</thead>
			<tbody>
				{#each resource.responses as response}
					<tr class="odd:bg-zinc-700 even:bg-zinc-800">
						<td class="border-r p-2">{response.code}</td>
						<td class="p-2">{response.reason}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
	<section>
		<h2 class="pb-6 text-4xl">Example Request</h2>
		<p class="rounded bg-zinc-800 p-2 font-mono text-red-500">
			{resource.method}
			{$page.url.origin}/{resource.sample_request.url}
		</p>
		{#if resource.sample_request.body}
			<div class="json-wrapper rounded bg-zinc-700 p-2 font-mono">
				<JsonView json={resource.sample_request.body} />
			</div>
		{/if}
	</section>
	<section>
		<h2 class="pb-6 text-4xl">Example Response</h2>

		<div class="json-wrapper rounded bg-zinc-700 p-2 font-mono">
			<p class:text-green-500={resource.sample_response.status}>200</p>
			<JsonView json={resource.sample_response.body} />
		</div>
	</section>
</div>

<style>
	.json-wrapper {
		--jsonPaddingLeft: 2rem;
	}
</style>

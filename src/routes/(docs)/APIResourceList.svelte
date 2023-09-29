<script lang="ts">
	import { page } from '$app/stores';
	import { resources } from '$lib/static/api_docs.json';
	import { paths } from '$lib/static/generated.json';
	import _ from 'lodash-es';

	console.log('GENERATED!!!', paths);

	const resource_groups = Object.keys(_.groupBy(resources, (r) => r.resource_group)).sort((a, b) =>
		a.localeCompare(b, 'en', { numeric: true })
	);
</script>

{#each resource_groups as resource_group}
	<div>
		<p class="pb-2 font-semibold uppercase tracking-widest">{resource_group}</p>
		<nav>
			<ul>
				{#each resources
					.filter((r) => r.resource_group === resource_group)
					.sort( (a, b) => a.resource.localeCompare( b.resource, 'en', { numeric: true } ) ) as resource}
					{@const pathname = `/docs/api/v1/${resource.resource}`}
					{@const isCurrent = $page.url.pathname === pathname ? 'true' : undefined}
					{@const text = `${resource.method} ${resource.resource}`}
					<li class="pb-1">
						<a
							class="aria-[current]:font-bold aria-[current]:text-neutral-200"
							aria-current={isCurrent}
							href={pathname}
						>
							{text}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
{/each}

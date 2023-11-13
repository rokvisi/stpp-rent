<script>
	import { page } from '$app/stores';
	import { roleNavLinks } from './role-navs/roleNavLinks';
</script>

{#if !$page.data.user}
	<div />
{:else}
	<section class="block bg-zinc-700 px-20 py-20">
		<nav>
			{#each roleNavLinks[$page.data.user.role] as link}
				<a
					href={link.href}
					class="block rounded px-3 py-2 text-stone-400 underline-offset-8 hover:bg-zinc-800 aria-[current]:text-stone-300 aria-[current]:underline"
					aria-current={$page.url.pathname === link.href ? 'true' : undefined}>{link.title}</a
				>
			{/each}
			<a
				href="/swagger/index.html"
				class="block rounded px-3 py-2 text-stone-400 underline-offset-8 hover:bg-zinc-800 aria-[current]:text-stone-300 aria-[current]:underline"
				>API Docs</a
			>
		</nav>

		{#if $page.data.user}
			<form action="/auth?/logout" method="POST">
				<button class="block w-full rounded px-3 py-2 text-left text-stone-400 hover:bg-zinc-800"
					>Logout</button
				>
			</form>
		{/if}
	</section>
{/if}

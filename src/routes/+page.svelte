<script lang="ts">
	import { lottie } from '$lib/lottie';

	import blob from '$lib/assets/house-lottie.json';
</script>

<div class="flex h-full flex-col items-center justify-center gap-20 md:flex-row">
	<div class="relative h-full w-full md:hidden">
		<div class="absolute left-0 top-0 h-full w-full" use:lottie={blob} />
	</div>

	<div class="my-auto flex grow flex-col gap-8 md:gap-20 xl:shrink-0 xl:px-20">
		<div>
			<p class="mb-2 text-4xl font-medium md:text-6xl">Looking for a room?</p>
			<p class="text-xl md:text-3xl">
				We've got you <span class="anim">covered</span>!
			</p>
		</div>
		<div>
			<p class="text-xl">
				<a
					class="font-medium text-[#f96743] underline underline-offset-8 transition-all hover:underline-offset-[6px]"
					href="/auth">Create an account or login</a
				>
				to search for a room
				<br /> or list up your own place for an extra income!
			</p>
		</div>
	</div>
	<div class="relative hidden h-full w-full md:inline-block">
		<div class="absolute left-0 top-0 h-full w-full" use:lottie={blob} />
	</div>
</div>

<style>
	@keyframes testt {
		from {
			font-variation-settings: 'wght' 200;
		}
		to {
			font-variation-settings: 'wght' 600;
		}
	}

	.anim {
		animation: testt 1s infinite;
		animation-direction: alternate;
	}
</style>

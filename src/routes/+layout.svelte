<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Cultivating Notes</title>
</svelte:head>

<div class="min-h-screen bg-white">
	<nav class="border-b border-gray-200">
		<div class="max-w-4xl mx-auto px-4 py-4">
			<a href="/" class="text-xl font-bold text-gray-900 hover:text-blue-600 transition">
				Cultivating Notes
			</a>
		</div>
	</nav>

	<main>
		{@render children?.()}
	</main>

	<footer class="border-t border-gray-200 mt-16">
		<div class="max-w-4xl mx-auto px-4 py-8">
			<p class="text-center text-gray-600 text-sm">
				© {new Date().getFullYear()} Cultivating Notes. Built with SvelteKit & Tailwind CSS.
			</p>
		</div>
	</footer>
</div>


<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Navbar, NavBrand, NavUl, NavLi, NavHamburger, Button } from 'flowbite-svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>gerrit-wanderer.dev</title>
</svelte:head>

<div class="mx-auto min-h-screen max-w-4xl bg-tokyonight-bg text-tokyonight-fg">
	<Navbar breakpoint="2xl" class="bg-tokyonight-bg border-b border-tokyonight-fg-gutter">
		<NavBrand href="/">
			<span class="self-center text-xl font-semibold whitespace-nowrap text-tokyonight-blue"
				>gerrit-wanderer.dev</span
			>
		</NavBrand>
		<div class="order-2 flex">
			<Button size="sm" class="bg-tokyonight-magenta hover:bg-tokyonight-purple text-tokyonight-bg">New Guide: Cultivating Notes</Button>
			<NavHamburger class="text-tokyonight-fg hover:bg-tokyonight-bg-dark focus:ring-tokyonight-fg-gutter" />
		</div>
		<NavUl class="order-1">
			<NavLi href="/" class="text-tokyonight-fg hover:text-tokyonight-cyan">Home</NavLi>
			<NavLi href="/notes/about-me" class="text-tokyonight-fg hover:text-tokyonight-cyan">About me</NavLi>
			<NavLi href="/notes/current-focus" class="text-tokyonight-fg hover:text-tokyonight-cyan">Current Focus</NavLi>
			<NavLi href="/notes/learned-today" class="text-tokyonight-fg hover:text-tokyonight-cyan">Things I learned</NavLi>
			<NavLi href="/notes/tools" class="text-tokyonight-fg hover:text-tokyonight-cyan">Tools I use</NavLi>
		</NavUl>
	</Navbar>

	<main>
		{@render children?.()}
	</main>

	<footer class="mt-16 border-t border-tokyonight-fg-gutter">
		<div class="px-4 py-8">
			<p class="text-center text-sm text-tokyonight-comment">
				© {new Date().getFullYear()} Cultivating Notes with Obsidian. Built with Svelte, Tailwind and
				Flowbite.
			</p>
		</div>
	</footer>
</div>

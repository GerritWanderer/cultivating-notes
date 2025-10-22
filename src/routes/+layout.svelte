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

<div class="mx-auto min-h-screen max-w-4xl bg-white">
	<Navbar breakpoint="2xl">
		<NavBrand href="/">
			<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
				>gerrit-wanderer.dev</span
			>
		</NavBrand>
		<div class="order-2 flex">
			<Button size="sm">New Guide: Cultivating Notes</Button>
			<NavHamburger />
		</div>
		<NavUl class="order-1">
			<NavLi href="/">Home</NavLi>
			<NavLi href="/notes/about-me">About me</NavLi>
			<NavLi href="/notes/current-focus">Current Focus</NavLi>
			<NavLi href="/notes/learned-today">Things I learned</NavLi>
			<NavLi href="/notes/tools">Tools I use</NavLi>
		</NavUl>
	</Navbar>

	<main>
		{@render children?.()}
	</main>

	<footer class="mt-16 border-t border-gray-200">
		<div class="px-4 py-8">
			<p class="text-center text-sm text-gray-600">
				© {new Date().getFullYear()} Cultivating Notes with Obsidian. Built with Svelte, Tailwind and
				Flowbite.
			</p>
		</div>
	</footer>
</div>

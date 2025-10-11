<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
  import logo from '$lib/assets/logo.svg';
	import { Navbar, NavBrand, NavUl, NavLi, NavHamburger, uiHelpers, Button } from 'flowbite-svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Cultivating Notes</title>
</svelte:head>

<div class="min-h-screen mx-auto max-w-4xl bg-white">
<Navbar breakpoint="2xl">
  <NavBrand href="/">
    <img src={logo} class="me-3 h-6 sm:h-9" alt="Logo" />
    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Cultivating Notes</span>
  </NavBrand>
  <div class="flex order-2">
    <Button size="sm">Get started</Button>
    <NavHamburger />
  </div>
  <NavUl class="order-1">
    <NavLi href="/">Home</NavLi>
  </NavUl>
</Navbar>

	<main>
		{@render children?.()}
	</main>

	<footer class="border-t border-gray-200 mt-16">
		<div class="px-4 py-8">
			<p class="text-center text-gray-600 text-sm">
				© {new Date().getFullYear()} Cultivating Notes with Obsidian. Built with Svelte, Tailwind and Flowbite.
			</p>
		</div>
	</footer>
</div>


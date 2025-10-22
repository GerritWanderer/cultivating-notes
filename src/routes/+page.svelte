<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>{data.meta.title} - Cultivating Notes</title>
	<meta name="description" content={data.meta.excerpt} />
</svelte:head>

<article class="py-12 px-4">
	<header class="mb-8">
		<h1 class="mb-4 text-4xl font-bold text-tokyonight-fg">{data.meta.title}</h1>
		<div class="mb-4 flex items-center gap-4 text-sm text-tokyonight-comment">
			<time datetime={data.meta.date}>
				{new Date(data.meta.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
		</div>
	</header>

	<div class="prose prose-invert prose-headings:text-tokyonight-blue prose-a:text-tokyonight-cyan prose-strong:text-tokyonight-orange prose-code:text-tokyonight-green prose-pre:bg-tokyonight-bg-dark max-w-none">
		<svelte:component this={data.content} />
	</div>
</article>

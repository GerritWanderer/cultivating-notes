<script lang="ts">
	export let data
</script>

<svelte:head>
	<title>{data.meta.title} - Cultivating Notes</title>
	<meta name="description" content={data.meta.excerpt} />
</svelte:head>

<article class="py-12 px-4">
	<header class="mb-8">
		<a href="/" class="text-tokyonight-blue hover:text-tokyonight-cyan mb-4 inline-block">← Back to all posts</a>
		<h1 class="text-4xl font-bold text-tokyonight-fg mb-4">{data.meta.title}</h1>
		<div class="flex items-center gap-4 text-sm text-tokyonight-comment mb-4">
			<time datetime={data.meta.date}>
				{new Date(data.meta.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
		</div>
		<div class="flex gap-2 mb-8">
			{#each data.meta.tags as tag}
				<span class="px-3 py-1 text-sm bg-tokyonight-bg-highlight text-tokyonight-cyan rounded-full border border-tokyonight-fg-gutter">{tag}</span>
			{/each}
		</div>
	</header>

	<div class="prose prose-invert prose-headings:text-tokyonight-blue prose-a:text-tokyonight-cyan prose-strong:text-tokyonight-orange prose-code:text-tokyonight-green prose-pre:bg-tokyonight-bg-dark max-w-none">
    <svelte:component this={data.content} />
	</div>
</article>

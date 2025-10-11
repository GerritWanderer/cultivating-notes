<script lang="ts">
	export let data
</script>

<svelte:head>
	<title>{data.meta.title} - Cultivating Notes</title>
	<meta name="description" content={data.meta.excerpt} />
</svelte:head>

<article class="py-12">
	<header class="mb-8">
		<a href="/" class="text-blue-600 hover:text-blue-700 mb-4 inline-block">← Back to all posts</a>
		<h1 class="text-4xl font-bold text-gray-900 mb-4">{data.meta.title}</h1>
		<div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
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
				<span class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">{tag}</span>
			{/each}
		</div>
	</header>

	<div class="prose">
    <svelte:component this={data.content} />
	</div>
</article>

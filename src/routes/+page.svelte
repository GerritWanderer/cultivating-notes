<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>{data.meta.title} - Cultivating Notes</title>
	<meta name="description" content={data.meta.excerpt} />
</svelte:head>

<article class="py-12">
	<header class="mb-8">
		<h1 class="mb-4 text-4xl font-bold text-gray-900">{data.meta.title}</h1>
		<div class="mb-4 flex items-center gap-4 text-sm text-gray-500">
			<time datetime={data.meta.date}>
				{new Date(data.meta.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
		</div>
	</header>

	<div class="prose">
		<svelte:component this={data.content} />
	</div>
</article>

<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { post } = data;
</script>

<svelte:head>
	<title>{post.title} - Cultivating Notes</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<article class="max-w-3xl mx-auto px-4 py-12">
	<header class="mb-8">
		<a href="/" class="text-blue-600 hover:text-blue-700 mb-4 inline-block">← Back to all posts</a>
		<h1 class="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
		<div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
			<time datetime={post.date}>
				{new Date(post.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
			<span>•</span>
			<span>{post.author}</span>
		</div>
		<div class="flex gap-2 mb-8">
			{#each post.tags as tag}
				<span class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">{tag}</span>
			{/each}
		</div>
	</header>

	<div class="prose">
		{@html post.content
			.split('\n')
			.map((line) => {
				if (line.startsWith('# ')) {
					return `<h1 class="text-3xl font-bold text-gray-900 mb-4 mt-8">${line.slice(2)}</h1>`;
				} else if (line.startsWith('## ')) {
					return `<h2 class="text-2xl font-bold text-gray-900 mb-3 mt-6">${line.slice(3)}</h2>`;
				} else if (line.startsWith('### ')) {
					return `<h3 class="text-xl font-bold text-gray-900 mb-2 mt-4">${line.slice(4)}</h3>`;
				} else if (line.startsWith('```')) {
					return line;
				} else if (line.trim() === '') {
					return '<br>';
				} else if (line.match(/^\d+\./)) {
					return `<li class="mb-2">${line.slice(line.indexOf('.') + 2)}</li>`;
				} else if (line.startsWith('- ')) {
					return `<li class="mb-2">${line.slice(2)}</li>`;
				} else {
					return `<p class="text-gray-700 mb-4 leading-relaxed">${line}</p>`;
				}
			})
			.join('\n')
			.replace(/```(\w+)\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4"><code class="text-gray-100">$2</code></pre>')
			.replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
			.replace(/<li/g, '<ul class="list-disc pl-6 mb-4 text-gray-700"><li')
			.replace(/<\/li>/g, '</li></ul>')
			.replace(/<\/ul>\n<ul[^>]*>/g, '\n')}
	</div>
</article>

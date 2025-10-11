<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="max-w-4xl mx-auto px-4 py-12">
	<header class="mb-12">
		<p class="text-lg text-gray-600">Thoughts on writing notes and beyond</p>
	</header>

	<div class="space-y-8">
		{#each data.posts as post}
			<article class="border-b border-gray-200 pb-8 last:border-b-0">
				<a href="/blog/{post.slug}" class="group">
					<h2 class="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
						{post.title}
					</h2>
				</a>
				<div class="flex items-center gap-4 text-sm text-gray-500 mb-3">
					<time datetime={post.date}>
						{new Date(post.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</time>
				</div>
				<p class="text-gray-700 mb-4">{post.excerpt}</p>
				<div class="flex gap-2">
					{#each post.tags as tag}
						<span class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">{tag}</span>
					{/each}
				</div>
			</article>
		{/each}
	</div>
</div>

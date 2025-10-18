<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="mx-auto max-w-4xl px-4 py-12">
	<header class="mb-12">
		<p class="text-lg text-gray-600">Thoughts on writing notes and beyond</p>
	</header>

	<div class="space-y-8">
		{#each data.notes as note}
			<article class="border-b border-gray-200 pb-8 last:border-b-0">
				<a href="/notes/{note.slug}" class="group">
					<h2 class="mb-2 text-2xl font-bold text-gray-900 transition group-hover:text-blue-600">
						{note.title}
					</h2>
				</a>
				<div class="mb-3 flex items-center gap-4 text-sm text-gray-500">
					<time datetime={note.date}>
						{new Date(note.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</time>
				</div>
				<p class="mb-4 text-gray-700">{note.excerpt}</p>
				<div class="flex gap-2">
					{#each note.tags as tag}
						<span class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">{tag}</span>
					{/each}
				</div>
			</article>
		{/each}
	</div>
</div>

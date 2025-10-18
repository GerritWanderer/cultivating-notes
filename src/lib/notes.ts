import type { Note } from '$lib/types';

export async function getNotes() {
	const blogPosts: Note[] = [];
	const paths = import.meta.glob('/src/notes/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Note, 'slug'>;
			const post = { ...metadata, slug } satisfies Note;
			blogPosts.push(post);
		}
	}

	return blogPosts;
}

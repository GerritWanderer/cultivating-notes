import { posts } from '$lib/posts';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const post = posts.find((p) => p.slug === params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	return {
		post
	};
};

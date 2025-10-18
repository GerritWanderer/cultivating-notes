import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const note = await import(`../../../notes/${params.slug}.md`);

		return {
			content: note.default,
			meta: note.metadata
		};
	} catch (e) {
		error(404, `Could not find ${params.slug}: ${e}`);
	}
}

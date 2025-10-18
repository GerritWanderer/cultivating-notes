import { getNotes } from '$lib/notes';
import { json } from '@sveltejs/kit';

export async function GET() {
	const notes = await getNotes();
	return json(notes);
}

<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import XIcon from '$lib/components/icons/XIcon.svelte';
	import type { Room, RoomImage, RoomNote } from '$lib/database/schema';
	import { themes } from '$lib/toast';
	import { toast } from '@zerodevx/svelte-toast';

	export let room: Room & {
		images: RoomImage[];
		notes: RoomNote[];
	};

	let noteStatusBusy = false;
	async function deleteNote(noteId: number) {
		noteStatusBusy = true;

		//* Delete note from db
		const res = await fetch(`/api/v1/houses/${room.fk_house}/rooms/${room.id}/notes/${noteId}`, {
			method: 'DELETE'
		});

		//* Check result
		if (res.ok) {
			room.notes = room.notes.filter((n) => n.id !== noteId);
			toast.push('Successfully deleted note!', { duration: 1500, theme: themes.success });
		} else {
			//* Display error message
			toast.push('Error deleting note!', { duration: 1500, theme: themes.error });
		}

		noteStatusBusy = false;
	}

	let newNoteText = '';
	async function createNote() {
		if (newNoteText.length === 0) return;

		noteStatusBusy = true;

		const formData = new FormData();
		formData.set('note', newNoteText);

		//* Create note
		const res = await fetch(`/api/v1/houses/${room.fk_house}/rooms/${room.id}/notes`, {
			method: 'POST',
			body: formData
		});

		//* Check result
		if (res.ok) {
			toast.push('Successfully created note!', { duration: 1500, theme: themes.success });
			newNoteText = '';
			invalidateAll();
		} else {
			//* Display error message
			toast.push('Error creating note!', { duration: 1500, theme: themes.error });
		}

		noteStatusBusy = false;
	}
</script>

<div class="space-y-2">
	<div class="flex flex-col gap-2 rounded border">
		{#each room.notes as note, i (note.id)}
			<div class="flex items-center px-2 py-1 even:bg-stone-800">
				<span class="mr-auto">{i + 1}. {note.note}</span>

				<button
					class="flex items-center gap-1 rounded px-2 py-1 hover:bg-zinc-800 disabled:cursor-wait"
					on:click={() => deleteNote(note.id)}
					disabled={noteStatusBusy}
				>
					<XIcon />
					<span>{noteStatusBusy ? 'Busy...' : 'Delete'}</span>
				</button>
			</div>
		{/each}
	</div>
	<div class="space-y-2 rounded py-2">
		<input
			id="newNoteInput"
			type="text"
			placeholder="Write new note..."
			bind:value={newNoteText}
			class="w-full rounded border bg-neutral-300 px-2 py-2 text-neutral-950 shadow placeholder:text-stone-800"
		/>
		<button
			class="flex items-center gap-1 rounded border px-3 py-1.5 hover:bg-zinc-800 disabled:cursor-wait"
			on:click={createNote}
			disabled={noteStatusBusy}
		>
			<PlusIcon />
			<p>{noteStatusBusy ? 'Busy...' : 'Post new note'}</p>
		</button>
	</div>
</div>

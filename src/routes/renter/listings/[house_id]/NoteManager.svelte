<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import XIcon from '$lib/components/icons/XIcon.svelte';
	import type { CommonArea, House, HouseLocationNote, Room } from '$lib/database/schema';
	import { themes } from '$lib/toast';
	import { toast } from '@zerodevx/svelte-toast';

	export let house: House & {
		houseLocationNotes: HouseLocationNote[];
		rooms: Room[];
		commonAreas: CommonArea[];
	};

	let locationNoteBusy = false;
	async function deleteLocationNote(noteId: number) {
		locationNoteBusy = true;

		//* Delete note from db
		const res = await fetch(`/api/v1/houses/${house.id}/notes/${noteId}`, {
			method: 'DELETE'
		});

		//* Check result
		if (res.ok) {
			house.houseLocationNotes = house.houseLocationNotes.filter((n) => n.id !== noteId);
			toast.push('Successfully deleted note!', { duration: 1500, theme: themes.success });
		} else {
			//* Display error message
			toast.push('Error deleting note!', { duration: 1500, theme: themes.error });
		}

		locationNoteBusy = false;
	}

	let newLocationNote = '';
	async function createLocationNote() {
		if (newLocationNote.length === 0) return;

		locationNoteBusy = true;

		const formData = new FormData();
		formData.set('note', newLocationNote);

		//* Create note
		const res = await fetch(`/api/v1/houses/${house.id}/notes`, {
			method: 'POST',
			body: formData
		});

		//* Check result
		if (res.ok) {
			toast.push('Successfully created note!', { duration: 1500, theme: themes.success });
			newLocationNote = '';
			invalidateAll();
		} else {
			//* Display error message
			toast.push('Error creating note!', { duration: 1500, theme: themes.error });
		}

		locationNoteBusy = false;
	}
</script>

<div class="space-y-2">
	<div class="flex flex-col gap-2 rounded border">
		{#each house.houseLocationNotes as note, i (note.id)}
			<div class="flex items-center px-2 py-1 even:bg-stone-800">
				<span class="mr-auto">{i + 1}. {note.note}</span>

				<button
					class="flex items-center gap-1 rounded px-2 py-1 hover:bg-zinc-800 disabled:cursor-wait"
					on:click={() => deleteLocationNote(note.id)}
					disabled={locationNoteBusy}
				>
					<XIcon />
					<span>{locationNoteBusy ? 'Busy...' : 'Delete'}</span>
				</button>
			</div>
		{/each}
	</div>
	<!-- <hr /> -->
	<div class="space-y-2 rounded py-2">
		<!-- <label class="inline-block shrink-0" for="newNoteInput">Post note:</label> -->
		<input
			id="newNoteInput"
			type="text"
			placeholder="Write new note..."
			bind:value={newLocationNote}
			class="w-full rounded border bg-stone-600 bg-opacity-50 px-2 py-2 shadow"
		/>
		<button
			class="flex items-center gap-1 rounded border px-3 py-1.5 hover:bg-zinc-800 disabled:cursor-wait"
			on:click={createLocationNote}
			disabled={locationNoteBusy}
		>
			<PlusIcon />
			<p>{locationNoteBusy ? 'Busy...' : 'Post new note'}</p>
		</button>
	</div>
</div>

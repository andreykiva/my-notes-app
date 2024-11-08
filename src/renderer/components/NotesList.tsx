import Note from "./Note";
import { useNotesContext } from "../context/NotesContext";
import useDebouncedSave from "../hooks/useDebouncedSave";

const NotesList = () => {
	const { notes, removeNote, updateNote, saveNotes } = useNotesContext();

	// Use the debounced save functionality to save notes after a delay (1 second)
	useDebouncedSave(notes, 1000, saveNotes);

	// If there are no notes, display a message informing the user
	if (notes.length === 0) {
		return (
			<div className="text-center pt-72">
				<span className="font-semibold text-2xl">
					You don't have any notes yet
				</span>
			</div>
		);
	}

	// If there are notes, render them in an list
	return (
		<ul className="overflow-y-auto pt-16 notes-list scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100">
			{notes.map((note) => (
				<Note
					key={note.id}
					note={note}
					onRemove={removeNote}
					onUpdate={updateNote}
				/>
			))}
		</ul>
	);
};

export default NotesList;

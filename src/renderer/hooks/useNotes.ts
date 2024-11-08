import { Note } from "@shared/models";
import { useEffect, useState } from "react";
import { generateNumericID } from "../utils";
import { fetchNotesFromApi, saveNotesToApi } from "../services/notesService";

// Custom hook for managing notes state and interactions
const useNotes = () => {
	// State to hold notes, loading status, and error message
	const [notes, setNotes] = useState<Note[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Effect to load notes from API on component mount
	useEffect(() => {
		loadNotes();
	}, []);

	// Load notes from the API and handle loading state and errors
	const loadNotes = async () => {
		setLoading(true);
		setError(null);

		try {
			const notesData = await fetchNotesFromApi();
			setNotes(notesData);
		} catch (err) {
			setError("Error loading notes");
		} finally {
			setLoading(false);
		}
	};

	// Create a new note and add it to the state
	const createNote = async () => {
		// Check if the last note is empty, return early if it is
		if (notes.length > 0) {
			const lastNote = notes[0];
			const lastNoteInner = lastNote.title + lastNote.content;

			if (lastNoteInner.trim().length === 0) {
				return;
			}
		}

		// Create a new note and add it to the notes state
		const newNote: Note = {
			id: generateNumericID(),
			title: "",
			content: "",
		};

		setNotes([newNote, ...notes]);
	};

	// Remove a note by filtering it out from the notes state
	const removeNote = async (noteId: number) => {
		const updatedNotes = notes.filter((note) => note.id !== noteId);
		setNotes(updatedNotes);
	};

	// Update an existing note in the notes state
	const updateNote = async (updatedNote: Note) => {
		const updatedNotes = notes.map((note) =>
			note.id === updatedNote.id ? updatedNote : note
		);

		setNotes(updatedNotes);
	};

	// Save the notes to the API
	const saveNotes = async () => {
		try {
			await saveNotesToApi(notes);
		} catch (err) {
			setError("Error saving notes");
		}
	};

	// Return notes, loading, error state, and functions to manage notes
	return {
		notes,
		loading,
		error,
		createNote,
		removeNote,
		updateNote,
		saveNotes,
	};
};

export default useNotes;

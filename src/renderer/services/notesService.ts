import { Note } from "@shared/models";

// Function to fetch notes from the API
export const fetchNotesFromApi = async () => {
	try {
		// Retrieve notes via the window.api.getNotes method
		return await window.api.getNotes();
	} catch (err) {
		// Throw error if the fetch operation fails
		throw new Error("Error loading notes");
	}
};

// Function to save notes to the API
export const saveNotesToApi = async (notes: Note[]) => {
	try {
		// Send notes to the API via the window.api.saveNotes method
		await window.api.saveNotes(notes);
	} catch (err) {
		// Throw error if the save operation fails
		throw new Error("Error saving notes");
	}
};

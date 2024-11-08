import { createContext, useContext, ReactNode } from "react";
import { Note } from "@shared/models";
import useNotes from "../hooks/useNotes";

// Define the shape of the context value
type NotesContextType = {
	notes: Note[]; // Array of notes
	createNote: () => void; // Function to create a new note
	removeNote: (id: number) => void; // Function to remove a note by ID
	updateNote: (updatedNote: Note) => void; // Function to update a note
	saveNotes: () => void; // Function to save notes to the API
	loading: boolean; // Loading state while notes are being fetched or saved
	error: string | null; // Error state for loading or saving notes
};

// Create the context with an undefined default value
const NotesContext = createContext<NotesContextType | undefined>(undefined);

type NotesProviderProps = {
	children: ReactNode; // Children components that will have access to the context
};

// Provider component to wrap the app and provide notes context
export const NotesProvider = ({ children }: NotesProviderProps) => {
	// Use custom hook to manage notes logic
	const { notes, createNote, removeNote, updateNote, saveNotes, loading, error } =
		useNotes();

	return (
		// Provide notes context to children
		<NotesContext.Provider
			value={{
				notes,
				createNote,
				removeNote,
				updateNote,
				saveNotes,
				loading,
				error,
			}}
		>
			{children}
		</NotesContext.Provider>
	);
};

// Custom hook to access notes context
export const useNotesContext = (): NotesContextType => {
	// Get the context value
	const context = useContext(NotesContext);

	// Throw an error if the context is used outside of NotesProvider
	if (!context) {
		throw new Error("useNotesContext must be used within a NotesProvider");
	}
	return context;
};

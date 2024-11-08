import { GetNotes, SaveNotes } from "@shared/types";

// Declaring a global interface for the `window` object to expose the API
declare global {
	interface Window {
		// Exposing a custom 'api' object to the renderer process
		api: {
			// Function to retrieve notes from the main process
			getNotes: GetNotes;

			// Function to save notes to the main process
			saveNotes: SaveNotes;
		};
	}
}

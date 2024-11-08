import { contextBridge, ipcRenderer } from "electron";
import { Note } from "@shared/models";

// Ensure context isolation is enabled for security
if (!process.contextIsolated) {
	throw new Error("contextIsolation must be enabled in the BrowserWindow");
}

try {
	// Expose a secure API to the renderer process
	contextBridge.exposeInMainWorld("api", {
		/**
		 * Fetches all notes from the main process.
		 *
		 * @returns {Promise<Note[]>} A promise that resolves to an array of notes.
		 */
		getNotes: async (): Promise<Note[]> => {
			return ipcRenderer.invoke("get-notes");
		},
		/**
		 * Saves the provided notes to the main process.
		 *
		 * @param {Note[]} notes - The array of notes to be saved.
		 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating success.
		 */
		saveNotes: async (notes: Note[]): Promise<boolean> => {
			return ipcRenderer.invoke("save-notes", notes);
		},
	});
} catch (error) {
	console.error(error);
}

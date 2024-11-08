import { app, dialog } from "electron";
import fs from "fs/promises";
import path from "path";
import { Note } from "@shared/models";

// Path to the notes file, stored in the user data directory
const notesFilePath = path.join(app.getPath("userData"), "notes.json");

/**
 * Ensures that a file exists at the specified path. If the file doesn't exist,
 * it creates the file with the provided default content.
 *
 * @param {string} path - The path to the file.
 * @param {any} defaultContent - Default content to write if the file doesn't exist (default is an empty array).
 * @returns {Promise<boolean>} - Returns a Promise that resolves to true if the file exists or was successfully created.
 */
export const ensureFile = async (
	path: string,
	defaultContent: any = []
): Promise<boolean> => {
	try {
		// Check if the file exists
		await fs.access(path);
		return true; // File exists, no action needed
	} catch {
		// If the file does not exist, try to create it with the default content
		try {
			await fs.writeFile(path, JSON.stringify(defaultContent), "utf8");
			return true; // File created successfully
		} catch (error) {
			// Show an error dialog if the file creation fails
			dialog.showMessageBox({
				type: "error",
				title: "Creation failed",
				message: "Error creating notes file: " + error,
			});

			throw new Error("Error creating notes file");
		}
	}
};

/**
 * Loads the notes from the file. If the file doesn't exist, it will be created first.
 *
 * @returns {Promise<Note[]>} - Returns a Promise that resolves to an array of Note objects.
 * @throws {Error} - Throws an error if reading the notes file fails.
 */
export const loadNotes = async (): Promise<Note[]> => {
	// Ensure the notes file exists, create it if necessary
	await ensureFile(notesFilePath, []);

	try {
		// Read the notes file and parse its contents
		const data = await fs.readFile(notesFilePath, "utf8");
		return JSON.parse(data); // Return the parsed notes
	} catch (error) {
		// Show an error dialog if reading the file fails
		dialog.showMessageBox({
			type: "error",
			title: "Reading failed",
			message: "Error reading notes: " + error,
		});

		throw new Error("Error reading notes");
	}
};

/**
 * Saves the provided notes to the notes file. If the file doesn't exist, it will be created first.
 *
 * @param {Note[]} notes - An array of Note objects to save.
 * @returns {Promise<boolean>} - Returns a Promise that resolves to true if the notes were successfully saved.
 * @throws {Error} - Throws an error if saving the notes file fails.
 */
export const saveNotes = async (notes: Note[]): Promise<boolean> => {
	// Ensure the notes file exists, create it if necessary
	await ensureFile(notesFilePath, []);

	try {
		// Write the notes to the file with pretty formatting (2 spaces)
		await fs.writeFile(notesFilePath, JSON.stringify(notes, null, 2), "utf8");
		return true; // Return true if the notes were saved successfully
	} catch (error) {
		// Show an error dialog if saving the file fails
		dialog.showMessageBox({
			type: "error",
			title: "Saving failed",
			message: "Error saving notes: " + error,
		});

		throw new Error("Error saving notes");
	}
};

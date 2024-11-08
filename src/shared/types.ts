import { Note } from "./models";

/**
 * Fetches all notes from the main process.
 *
 * @returns {Promise<Note[]>} A promise that resolves to an array of notes.
 */
export type GetNotes = () => Promise<Note[]>;

/**
 * Saves the provided notes to the main process.
 *
 * @param {Note[]} notes - The array of notes to be saved.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating success.
 */
export type SaveNotes = (notes: Note[]) => Promise<boolean>;

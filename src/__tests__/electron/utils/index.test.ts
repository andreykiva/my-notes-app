import { describe, it, expect, vi, beforeEach } from "vitest";
import { ensureFile, loadNotes, saveNotes } from "@electron/lib/index";
import { dialog } from "electron";
import fs from "fs/promises";

vi.mock("fs/promises"); // Mock fs module
vi.mock("electron", () => ({
	dialog: {
		showMessageBox: vi.fn(), // Mock dialog
	},
	app: {
		getPath: vi.fn(() => "mockPath"), // Mock app path
	},
}));

describe("Note management", () => {
	const notesFilePath = "mockPath/notes.json";

	beforeEach(() => {
		vi.clearAllMocks(); // Clear mocks before each test
	});

	describe("ensureFile", () => {
		it("should return true if the file exists", async () => {
			vi.spyOn(fs, "access").mockResolvedValueOnce(undefined); // Mock file exists

			const result = await ensureFile(notesFilePath);
			expect(result).toBe(true); // Check if file is accessible
			expect(fs.access).toHaveBeenCalledWith(notesFilePath); // Check access call
		});

		it("should create the file if it does not exist", async () => {
			vi.spyOn(fs, "access").mockRejectedValueOnce(new Error("File not found")); // Mock file not found
			vi.spyOn(fs, "writeFile").mockResolvedValueOnce(undefined); // Mock file creation

			const result = await ensureFile(notesFilePath);
			expect(result).toBe(true); // Check if file creation is successful
			expect(fs.writeFile).toHaveBeenCalledWith(notesFilePath, "[]", "utf8"); // Check file creation call
		});

		it("should show an error dialog and throw if file creation fails", async () => {
			vi.spyOn(fs, "access").mockRejectedValueOnce(new Error("File not found"));
			vi.spyOn(fs, "writeFile").mockRejectedValueOnce(new Error("Write failed")); // Mock file creation failure

			await expect(ensureFile(notesFilePath)).rejects.toThrow(
				"Error creating notes file"
			); // Check if error is thrown
			expect(dialog.showMessageBox).toHaveBeenCalledWith({
				type: "error",
				title: "Creation failed",
				message: "Error creating notes file: Error: Write failed", // Check error dialog call
			});
		});
	});

	describe("loadNotes", () => {
		it("should load notes if the file exists", async () => {
			const mockNotes = [{ id: 1, content: "Test note" }];
			vi.spyOn(fs, "readFile").mockResolvedValueOnce(JSON.stringify(mockNotes)); // Mock reading file

			const result = await loadNotes();
			expect(result).toEqual(mockNotes); // Check if notes are loaded
			expect(fs.readFile).toHaveBeenCalledWith(
				expect.stringMatching(/notes\.json$/),
				"utf8" // Check readFile call
			);
		});

		it("should create the file if it does not exist and then load notes", async () => {
			const mockNotes = [{ id: 1, content: "Test note" }];
			vi.spyOn(fs, "access").mockRejectedValueOnce(new Error("File not found")); // Mock file not found
			vi.spyOn(fs, "writeFile").mockResolvedValueOnce(undefined); // Mock file creation
			vi.spyOn(fs, "readFile").mockResolvedValueOnce(JSON.stringify(mockNotes)); // Mock reading file after creation

			const result = await loadNotes();
			expect(result).toEqual(mockNotes); // Check if notes are loaded after file creation
			expect(fs.writeFile).toHaveBeenCalledWith(
				expect.stringMatching(/notes\.json$/),
				"[]",
				"utf8" // Check writeFile call for file creation
			);
			expect(fs.readFile).toHaveBeenCalledWith(
				expect.stringMatching(/notes\.json$/),
				"utf8" // Check readFile call
			);
		});

		it("should show an error dialog and throw if reading the file fails", async () => {
			vi.spyOn(fs, "readFile").mockRejectedValueOnce(new Error("Read failed")); // Mock read failure

			await expect(loadNotes()).rejects.toThrow("Error reading notes"); // Check if error is thrown
			expect(dialog.showMessageBox).toHaveBeenCalledWith({
				type: "error",
				title: "Reading failed",
				message: "Error reading notes: Error: Read failed", // Check error dialog call
			});
		});
	});

	describe("saveNotes", () => {
		it("should save notes successfully", async () => {
			const mockNotes = [{ id: 1, title: "Test title", content: "Test content" }];
			vi.spyOn(fs, "access").mockResolvedValueOnce(undefined); // Mock file exists
			vi.spyOn(fs, "writeFile").mockResolvedValueOnce(undefined); // Mock successful file write

			const result = await saveNotes(mockNotes);
			expect(result).toBe(true); // Check if notes are saved
			expect(fs.writeFile).toHaveBeenCalledWith(
				expect.stringMatching(/notes\.json$/),
				JSON.stringify(mockNotes, null, 2),
				"utf8" // Check writeFile call with formatted notes
			);
		});

		it("should show an error dialog and throw if saving the notes fails", async () => {
			const mockNotes = [{ id: 1, title: "Test title", content: "Test content" }];
			vi.spyOn(fs, "writeFile").mockRejectedValueOnce(new Error("Write failed")); // Mock write failure

			await expect(saveNotes(mockNotes)).rejects.toThrow("Error saving notes"); // Check if error is thrown
			expect(dialog.showMessageBox).toHaveBeenCalledWith({
				type: "error",
				title: "Saving failed",
				message: "Error saving notes: Error: Write failed", // Check error dialog call
			});
		});
	});
});

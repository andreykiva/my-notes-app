import { renderHook, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import useNotes from "@renderer/hooks/useNotes";
import * as NotesService from "@renderer/services/notesService";

import { vi, describe, it, expect } from "vitest";

describe("useNotes Hook", () => {
	// Mocking service functions
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should load notes on mount", async () => {
		const mockNotes = [{ id: 1, title: "Test", content: "Content" }];
		vi.spyOn(NotesService, "fetchNotesFromApi").mockResolvedValue(mockNotes);

		const { result } = renderHook(() => useNotes());

		await act(async () => {
			result.current.createNote();
		});

		expect(result.current.notes).toEqual(mockNotes);
		expect(result.current.loading).toBe(false);
		expect(result.current.error).toBe(null);
		expect(NotesService.fetchNotesFromApi).toHaveBeenCalledTimes(1);
	});

	it("should handle error when loading notes", async () => {
		vi.spyOn(NotesService, "fetchNotesFromApi").mockRejectedValue(
			new Error("Error loading notes")
		);

		const { result } = renderHook(() => useNotes());

		// Wait for the state update
		await act(async () => result.current.loading === false);

		// Check that notes are not loaded in case of error
		expect(result.current.notes).toHaveLength(0); // Expecting an empty array in case of error
		expect(result.current.loading).toBe(false);
		expect(result.current.error).toBe("Error loading notes");
	});

	it("should create a new note", async () => {
		const { result } = renderHook(() => useNotes());

		await act(async () => {
			result.current.createNote();
		});

		// Check that a new note was added
		expect(result.current.notes).toHaveLength(1);
		expect(result.current.notes[0].title).toBe("");
		expect(result.current.notes[0].content).toBe("");
	});

	it("should delete a note", async () => {
		const { result } = renderHook(() => useNotes());

		await act(async () => {
			result.current.createNote();
		});

		const noteId = result.current.notes[0].id;

		act(() => {
			result.current.removeNote(noteId);
		});

		// Check that the note was deleted
		expect(result.current.notes).toHaveLength(0);
	});

	it("should update an existing note", async () => {
		const { result } = renderHook(() => useNotes());

		await act(async () => {
			result.current.createNote();
		});

		const updatedNote = {
			...result.current.notes[0],
			title: "Updated Title",
			content: "Updated Content",
		};

		await act(async () => {
			result.current.updateNote(updatedNote);
		});

		// Check that the note was updated
		expect(result.current.notes[0].title).toBe("Updated Title");
		expect(result.current.notes[0].content).toBe("Updated Content");
	});

	it("should save notes by calling saveNotesToApi", async () => {
		// Mocking `saveNotesToApi`
		vi.spyOn(NotesService, "saveNotesToApi").mockResolvedValue(undefined);

		const { result } = renderHook(() => useNotes());

		act(() => {
			result.current.createNote();
		});

		await act(async () => {
			await result.current.saveNotes();
		});

		// Check that `saveNotesToApi` was called with the current notes
		expect(NotesService.saveNotesToApi).toHaveBeenCalledWith(result.current.notes);
	});
});

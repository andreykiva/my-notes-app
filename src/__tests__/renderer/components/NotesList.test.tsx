import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import NotesList from "@renderer/components/NotesList";
import * as NotesContextModule from "@renderer/context/NotesContext";

describe("NotesList Component", () => {
	// Helper function to rerender NotesList with updated mock context
	const rerenderWithUpdatedContext = () => {
		render(<NotesList />);
	};

	it("should display a message when there are no notes", () => {
		vi.spyOn(NotesContextModule, "useNotesContext").mockReturnValue({
			notes: [],
			createNote: vi.fn(),
			removeNote: vi.fn(),
			updateNote: vi.fn(),
			saveNotes: vi.fn(),
			loading: false,
			error: null,
		});

		act(() => {
			rerenderWithUpdatedContext();
		});

		// Assert the empty notes message is displayed
		expect(screen.getByText("You don't have any notes yet")).toBeInTheDocument();
	});

	it("should display a list of notes when notes are available", () => {
		const mockNotes = [
			{ id: 1, title: "Note 1", content: "Content of Note 1" },
			{ id: 2, title: "Note 2", content: "Content of Note 2" },
		];

		vi.spyOn(NotesContextModule, "useNotesContext").mockReturnValue({
			notes: mockNotes,
			createNote: vi.fn(),
			removeNote: vi.fn(),
			updateNote: vi.fn(),
			saveNotes: vi.fn(),
			loading: false,
			error: null,
		});

		act(() => {
			rerenderWithUpdatedContext();
		});

		// Verify each note is displayed
		mockNotes.forEach((note) => {
			expect(screen.getByText(note.content)).toBeInTheDocument();
		});
	});

	it("should call removeNote when the delete button is clicked on a note", async () => {
		const mockNotes = [{ id: 1, title: "Note 1", content: "Content of Note 1" }];
		const removeNoteMock = vi.fn();

		vi.spyOn(NotesContextModule, "useNotesContext").mockReturnValue({
			notes: mockNotes,
			createNote: vi.fn(),
			removeNote: removeNoteMock,
			updateNote: vi.fn(),
			saveNotes: vi.fn(),
			loading: false,
			error: null,
		});

		await act(async () => {
			rerenderWithUpdatedContext();
		});

		// Simulate clicking the delete button
		fireEvent.click(screen.getByRole("button", { name: "Delete" }));

		// Check that removeNote was called with the correct note ID
		expect(removeNoteMock).toHaveBeenCalledWith(mockNotes[0].id);
	});

	it("should call updateNote when a note is updated", async () => {
		const mockNotes = [{ id: 1, title: "Note 1", content: "Content of Note 1" }];
		const updateNoteMock = vi.fn();

		vi.spyOn(NotesContextModule, "useNotesContext").mockReturnValue({
			notes: mockNotes,
			createNote: vi.fn(),
			removeNote: vi.fn(),
			updateNote: updateNoteMock,
			saveNotes: vi.fn(),
			loading: false,
			error: null,
		});

		await act(async () => {
			rerenderWithUpdatedContext();
		});

		// Simulate updating the note's title
		const titleInput = screen.getByDisplayValue("Note 1");
		fireEvent.change(titleInput, { target: { value: "Updated Note Title" } });

		// Wait for updateNote to be called with the updated note
		await waitFor(() => {
			expect(updateNoteMock).toHaveBeenCalledWith({
				...mockNotes[0],
				title: "Updated Note Title",
			});
		});
	});

	it("should call saveNotes after a debounce delay", async () => {
		const mockNotes = [{ id: 1, title: "Note 1", content: "Content of Note 1" }];
		const saveNotesMock = vi.fn();

		vi.spyOn(NotesContextModule, "useNotesContext").mockReturnValue({
			notes: mockNotes,
			createNote: vi.fn(),
			removeNote: vi.fn(),
			updateNote: vi.fn(),
			saveNotes: saveNotesMock,
			loading: false,
			error: null,
		});

		await act(async () => {
			rerenderWithUpdatedContext();
		});

		// Wait for saveNotes to be called due to debounce (assuming `useDebouncedSave` triggers this after 1 second)
		await waitFor(() => expect(saveNotesMock).toHaveBeenCalledTimes(1), {
			timeout: 1100,
		});
	});
});

import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import NotesContainer from "@renderer/components/NotesContainer";
import * as NotesContextModule from "@renderer/context/NotesContext";
import { Note } from "@shared/models";

describe("NotesContainer Component", () => {
	it("should display the Loader when notes are loading", async () => {
		// Mock context with loading state set to true
		vi.spyOn(NotesContextModule, "useNotesContext").mockReturnValue({
			notes: [],
			createNote: vi.fn(),
			removeNote: vi.fn(),
			updateNote: vi.fn(),
			saveNotes: vi.fn(),
			loading: true,
			error: null,
		});

		act(() => {
			render(<NotesContainer />);
		});

		// Expect a loading indicator to be rendered
		expect(screen.getByTestId("loader")).toBeInTheDocument();
	});

	it("should display an error message if loading fails", async () => {
		// Mock context with an error message
		vi.spyOn(NotesContextModule, "useNotesContext").mockReturnValue({
			notes: [],
			createNote: vi.fn(),
			removeNote: vi.fn(),
			updateNote: vi.fn(),
			saveNotes: vi.fn(),
			loading: false,
			error: "Failed loading notes",
		});

		act(() => {
			render(<NotesContainer />);
		});

		// Expect the error message to be displayed
		expect(screen.getByText("Failed loading notes")).toBeInTheDocument();
	});

	it("should display the list of notes if data loads successfully", async () => {
		const mockNotes = [
			{ id: 1, title: "Note 1", content: "Content of Note 1" },
			{ id: 2, title: "Note 2", content: "Content of Note 2" },
		];

		// Mock context with loaded notes
		vi.spyOn(NotesContextModule, "useNotesContext").mockReturnValue({
			notes: mockNotes,
			createNote: vi.fn(),
			removeNote: vi.fn(),
			updateNote: vi.fn(),
			saveNotes: vi.fn(),
			loading: false,
			error: null,
		});

		await act(async () => {
			render(<NotesContainer />);
		});

		// Check that notes are displayed
		expect(screen.getByText("Content of Note 1")).toBeInTheDocument();
		expect(screen.getByText("Content of Note 2")).toBeInTheDocument();
	});

	it('should call createNote when the "Create New Note" button is clicked and add a new note to the mock notes array', async () => {
		// Set up a mock array and a state tracker for notes
		let mockNotes: Note[] = [];
		const createNoteMock = vi.fn(() => {
			// When createNote is called, add a new note to mockNotes and trigger re-render
			mockNotes = [
				...mockNotes,
				{
					id: mockNotes.length + 1,
					title: "New Note",
					content: "New Note Content",
				},
			];
			rerenderWithUpdatedContext(); // Function to re-render with the updated context
		});

		// Mock context with createNote function and initial notes
		const useNotesContextMock = vi
			.spyOn(NotesContextModule, "useNotesContext")
			.mockImplementation(() => ({
				notes: mockNotes,
				createNote: createNoteMock,
				removeNote: vi.fn(),
				updateNote: vi.fn(),
				saveNotes: vi.fn(),
				loading: false,
				error: null,
			}));

		// Function to render component with the latest mock context
		const rerenderWithUpdatedContext = () => {
			render(<NotesContainer />);
		};

		await act(async () => {
			rerenderWithUpdatedContext();
		});

		// Trigger createNote by clicking the button
		fireEvent.click(screen.getByText("+ Create New Note"));

		// Wait for the new note to appear in the document
		await waitFor(() => {
			expect(screen.getByText("New Note Content")).toBeInTheDocument();
		});

		// Verify createNote was called
		expect(createNoteMock).toHaveBeenCalled();
	});
});

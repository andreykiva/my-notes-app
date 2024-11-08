import { render, screen, act } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import App from "@renderer/App";
import * as NotesContextModule from "@renderer/context/NotesContext";

describe("App Component", () => {
	// Clear localStorage before each test to ensure a fresh state
	beforeEach(() => {
		localStorage.clear();
	});

	it("should render WelcomeScreen on the first launch with no notes", async () => {
		// Mock the useNotesContext hook to simulate the absence of notes
		vi.spyOn(NotesContextModule, "useNotesContext").mockReturnValue({
			notes: [],
			createNote: vi.fn(),
			removeNote: vi.fn(),
			updateNote: vi.fn(),
			saveNotes: vi.fn(),
			loading: false,
			error: null,
		});

		// Simulate the first app launch by removing the "firstLaunch" key
		localStorage.removeItem("firstLaunch");

		act(() => {
			render(<App />);
		});

		// Expect the WelcomeScreen to be rendered with relevant elements
		expect(screen.getByText("Welcome to Your Notes App!")).toBeInTheDocument();
		expect(screen.getByText("🪐 Create Your First Note")).toBeInTheDocument();
	});

	it("should render NotesContainer when notes are present on the first launch", async () => {
		// Mock the useNotesContext hook to simulate a context with one existing note
		vi.spyOn(NotesContextModule, "useNotesContext").mockReturnValue({
			notes: [{ id: 1, title: "Title 1", content: "Content 1" }],
			createNote: vi.fn(),
			removeNote: vi.fn(),
			updateNote: vi.fn(),
			saveNotes: vi.fn(),
			loading: false,
			error: null,
		});

		// Simulate the first app launch by removing the "firstLaunch" key
		localStorage.removeItem("firstLaunch");

		act(() => {
			render(<App />);
		});

		// Verify that NotesContainer is rendered and displays the existing note
		expect(screen.getByText("+ Create New Note")).toBeInTheDocument();
		expect(screen.getByText("Content 1")).toBeInTheDocument();
	});

	it("should render NotesContainer if it's not the first launch and notes are present", async () => {
		// Mock the useNotesContext hook with one existing note
		vi.spyOn(NotesContextModule, "useNotesContext").mockReturnValue({
			notes: [{ id: 1, title: "Title 1", content: "Content 1" }],
			createNote: vi.fn(),
			removeNote: vi.fn(),
			updateNote: vi.fn(),
			saveNotes: vi.fn(),
			loading: false,
			error: null,
		});

		// Simulate a returning user by setting "firstLaunch" to "false"
		localStorage.setItem("firstLaunch", "false");

		act(() => {
			render(<App />);
		});

		// Verify that NotesContainer is rendered and displays the existing note
		expect(screen.getByText("+ Create New Note")).toBeInTheDocument();
		expect(screen.getByText("Content 1")).toBeInTheDocument();
	});
});

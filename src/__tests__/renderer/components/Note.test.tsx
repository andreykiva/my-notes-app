import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { Note as NoteType } from "@shared/models";
import Note from "@renderer/components/Note";
import "@testing-library/jest-dom";

// Mock note data
const mockNote: NoteType = {
	id: 1,
	title: "Sample Title",
	content: "<p>Sample Content</p>",
};

// Mock functions
const mockOnRemove = vi.fn();
const mockOnUpdate = vi.fn();

describe("Note Component", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it("renders correctly with title and content", () => {
		render(<Note note={mockNote} onRemove={mockOnRemove} onUpdate={mockOnUpdate} />);

		expect(screen.getByDisplayValue("Sample Title")).toBeInTheDocument();
		expect(screen.getByText(/Sample Content/i)).toBeInTheDocument();
	});

	it("calls onUpdate with updated title when title is changed", () => {
		render(<Note note={mockNote} onRemove={mockOnRemove} onUpdate={mockOnUpdate} />);
		const titleInput = screen.getByPlaceholderText("Enter note title here...");

		fireEvent.change(titleInput, { target: { value: "Updated Title" } });

		expect(mockOnUpdate).toHaveBeenCalledWith({
			...mockNote,
			title: "Updated Title",
		});
	});

	it("calls onRemove with note ID when delete button is clicked", () => {
		render(<Note note={mockNote} onRemove={mockOnRemove} onUpdate={mockOnUpdate} />);
		const deleteButton = screen.getByLabelText("Delete");

		fireEvent.click(deleteButton);

		expect(mockOnRemove).toHaveBeenCalledWith(mockNote.id);
	});

	it("displays placeholder text if content is empty", () => {
		render(
			<Note
				note={{ ...mockNote, content: "" }}
				onRemove={mockOnRemove}
				onUpdate={mockOnUpdate}
			/>
		);

		expect(screen.getByText("Write something...")).toBeInTheDocument();
	});
});

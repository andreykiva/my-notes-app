import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import ImageUploader from "@renderer/components/ImageUploader";
import { Editor } from "@tiptap/react";
import * as utils from "@renderer/utils";

describe("ImageUploader Component", () => {
	let editor: Editor;

	beforeEach(() => {
		// Mock the `chain` method and other methods from the `Editor` instance
		editor = {
			chain: vi.fn().mockReturnThis(),
			focus: vi.fn().mockReturnThis(),
			setImage: vi.fn().mockReturnThis(),
			run: vi.fn(),
		} as unknown as Editor; // Mocking the TipTap editor instance
	});

	it("should toggle the URL input field when the button is clicked", async () => {
		render(<ImageUploader editor={editor} />);

		const button = screen.getByRole("button");

		// Initially, the input should not be in the document
		expect(screen.queryByPlaceholderText("Image URL")).not.toBeInTheDocument();

		fireEvent.click(button);

		// Now the input should be visible
		expect(screen.getByPlaceholderText("Image URL")).toBeInTheDocument();

		fireEvent.click(button);

		// The input should not be in the document now
		expect(screen.queryByPlaceholderText("Image URL")).not.toBeInTheDocument();
	});

	it("should update the image URL state when the input value changes", async () => {
		render(<ImageUploader editor={editor} />);

		fireEvent.click(screen.getByRole("button"));

		// Get the input field and change its value
		const input = screen.getByPlaceholderText("Image URL") as HTMLInputElement;
		fireEvent.change(input, { target: { value: "http://example.com/image.jpg" } });

		// The input value should be updated
		expect(input.value).toBe("http://example.com/image.jpg");
	});

	it("should show an error message when the URL is invalid", async () => {
		const validateImageUrlMock = vi
			.spyOn(utils, "validateImageUrl")
			.mockReturnValue("Invalid image URL");

		render(<ImageUploader editor={editor} />);

		fireEvent.click(screen.getByRole("button"));

		// Change the input to an invalid URL
		const input = screen.getByPlaceholderText("Image URL");
		fireEvent.change(input, { target: { value: "invalid-url" } });

		fireEvent.click(screen.getByText("Add"));

		// The error message should be displayed
		expect(screen.getByText("Invalid image URL")).toBeInTheDocument();

		// Check that validateImageUrl was called
		expect(validateImageUrlMock).toHaveBeenCalledWith("invalid-url");
	});

	it("should close the URL input field when the Add button is clicked and the URL is valid", async () => {
		const validateImageUrlMock = vi
			.spyOn(utils, "validateImageUrl")
			.mockReturnValue(null);

		render(<ImageUploader editor={editor} />);

		fireEvent.click(screen.getByRole("button"));

		// Change the input to a valid URL
		const input = screen.getByPlaceholderText("Image URL") as HTMLInputElement;
		fireEvent.change(input, { target: { value: "http://example.com/image.jpg" } });

		fireEvent.click(screen.getByText("Add"));

		expect(input).not.toBeInTheDocument();

		// Check that validateImageUrl was called
		expect(validateImageUrlMock).toHaveBeenCalledWith("http://example.com/image.jpg");
	});

	it("should close the URL input field when the Cancel button is clicked", async () => {
		render(<ImageUploader editor={editor} />);

		fireEvent.click(screen.getByRole("button"));

		// Change the input value
		const input = screen.getByPlaceholderText("Image URL") as HTMLInputElement;
		fireEvent.change(input, { target: { value: "http://example.com/image.jpg" } });

		fireEvent.click(screen.getByText("Cancel"));

		// The input should be closed
		expect(input).not.toBeInTheDocument();
	});
});

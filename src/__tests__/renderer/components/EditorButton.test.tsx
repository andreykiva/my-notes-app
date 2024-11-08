import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditorButton from "@renderer/components/ui/EditorButton";

describe("EditorButton Component", () => {
	const mockIcon = "/path/to/icon.png";
	const mockOnClick = vi.fn();

	it("does not call onClick when disabled", () => {
		render(<EditorButton icon={mockIcon} onClick={mockOnClick} disabled />);
		fireEvent.click(screen.getByRole("button"));
		expect(mockOnClick).not.toHaveBeenCalled();
	});

	it("renders the button with the provided icon", () => {
		render(<EditorButton icon={mockIcon} />);
		const iconImage = screen.getByRole("img");
		expect(iconImage).toHaveAttribute("src", mockIcon);
	});

	it("applies active styling when active prop is true", () => {
		render(<EditorButton icon={mockIcon} active />);
		const button = screen.getByRole("button");
		expect(button).toHaveClass("bg-gray-300");
	});

	it("is disabled when the disabled prop is true", () => {
		render(<EditorButton icon={mockIcon} disabled />);
		const button = screen.getByRole("button");
		expect(button).toBeDisabled();
	});

	it("calls onClick when clicked if not disabled", () => {
		render(<EditorButton icon={mockIcon} onClick={mockOnClick} />);
		fireEvent.click(screen.getByRole("button"));
		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});
});

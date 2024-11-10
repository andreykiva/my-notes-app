import { useState } from "react";
import { Editor } from "@tiptap/react";
import EditorButton from "./ui/EditorButton";
import imageIcon from "../assets/icons/image.svg";
import { validateImageUrl } from "../utils/index";

type ImageButtonProps = {
	editor: Editor; // The TipTap editor instance to interact with
};

const ImageUploader = ({ editor }: ImageButtonProps) => {
	// State for the image URL input
	const [imageUrl, setImageUrl] = useState("");
	// State for any error message related to image URL validation
	const [error, setError] = useState<string | null>(null);
	// State to toggle the visibility of the URL input field
	const [isUrlInputOpen, setIsUrlInputOpen] = useState(false);

	// Handler for updating the image URL and resetting any existing errors
	const handleChangeUrl = (url: string) => {
		setImageUrl(url);
		setError(null); // Clear any error when URL is updated
	};

	// Handler to validate the URL and add the image to the editor if valid
	const handleAddImage = () => {
		const validateError = validateImageUrl(imageUrl);

		// If the URL is invalid, set the error message and return
		if (validateError) {
			setError(validateError);
			return;
		}

		// Insert the image into the editor content if the URL is valid
		editor.chain().focus().setImage({ src: imageUrl }).run();

		// Close the URL input and reset the URL state
		setIsUrlInputOpen(false);
		setImageUrl("");
	};

	// Toggle the display of the URL input field and reset input and error states when closing
	const handleToggleUrlInput = () => {
		if (isUrlInputOpen) {
			setIsUrlInputOpen(false);
			setImageUrl("");
			setError(null);
		} else {
			setIsUrlInputOpen(true);
		}
	};

	return (
		<>
			<EditorButton
				onClick={handleToggleUrlInput}
				active={isUrlInputOpen}
				icon={imageIcon}
			/>
			{isUrlInputOpen && (
				<div className="absolute left-1/4 top-full w-80 bg-[rgb(40,40,40)] p-3 rounded-xl z-10 shadow-md shadow-slate-950">
					<input
						type="text"
						placeholder="Image URL"
						className={`w-full bg-transparent outline-none p-2 border rounded-xl ${
							error && "border-red-500"
						}`}
						value={imageUrl}
						onChange={(e) => handleChangeUrl(e.target.value)}
						autoFocus
					/>

					{error && <span className="text-red-500">{error}</span>}

					<div className="flex justify-end gap-4 pr-2 mt-2">
						<button
							onClick={handleToggleUrlInput}
							className="text-red-500 hover:opacity-70"
						>
							Cancel
						</button>
						<button
							onClick={handleAddImage}
							className="text-green-200 hover:opacity-70"
						>
							Add
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default ImageUploader;

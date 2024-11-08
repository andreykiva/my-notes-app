import { Editor } from "@tiptap/react";
import EditorButton from "./ui/EditorButton";
import textBoldIcon from "../assets/icons/text-bold.svg";
import textItalicIcon from "../assets/icons/text-italic.svg";
import textStrikeIcon from "../assets/icons/text-strike.svg";
import textH1Icon from "../assets/icons/text-h1.svg";
import textH2Icon from "../assets/icons/text-h2.svg";
import bulletListIcon from "../assets/icons/bullet-list.svg";
import orderedListIcon from "../assets/icons/ordered-list.svg";
import quoteIcon from "../assets/icons/quote.svg";
import codeIcon from "../assets/icons/code.svg";
import horizontalIcon from "../assets/icons/horizontal.svg";
import undoIcon from "../assets/icons/undo.svg";
import redoIcon from "../assets/icons/redo.svg";

type EditorButtonsListProps = {
	editor: Editor; // The TipTap editor instance to interact with
};

// EditorButtonsList component for rendering a set of toolbar buttons
const EditorButtonsList = ({ editor }: EditorButtonsListProps) => {
	return (
		<div className="flex px-4 py-2 gap-2 border-b border-gray-300">
			{/* Bold Button */}
			<EditorButton
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				active={editor.isActive("bold")}
				icon={textBoldIcon}
			/>
			{/* Italic Button */}
			<EditorButton
				onClick={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				active={editor.isActive("italic")}
				icon={textItalicIcon}
			/>
			{/* Strike Button */}
			<EditorButton
				onClick={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				active={editor.isActive("strike")}
				icon={textStrikeIcon}
			/>
			{/* Heading 1 Button */}
			<EditorButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				active={editor.isActive("heading", { level: 1 })}
				icon={textH1Icon}
			/>
			{/* Heading 2 Button */}
			<EditorButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				active={editor.isActive("heading", { level: 2 })}
				icon={textH2Icon}
			/>
			{/* Bullet List Button */}
			<EditorButton
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				active={editor.isActive("bulletList")}
				icon={bulletListIcon}
			/>
			{/* Ordered List Button */}
			<EditorButton
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				active={editor.isActive("orderedList")}
				icon={orderedListIcon}
			/>
			{/* Blockquote Button */}
			<EditorButton
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				active={editor.isActive("blockquote")}
				icon={quoteIcon}
			/>
			{/* Code Block Button */}
			<EditorButton
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				active={editor.isActive("codeBlock")}
				icon={codeIcon}
			/>
			{/* Horizontal Rule Button */}
			<EditorButton
				onClick={() => editor.chain().focus().setHorizontalRule().run()}
				icon={horizontalIcon}
			/>
			{/* Undo Button */}
			<EditorButton
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
				icon={undoIcon}
			/>
			{/* Redo Button */}
			<EditorButton
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
				icon={redoIcon}
			/>
		</div>
	);
};

export default EditorButtonsList;

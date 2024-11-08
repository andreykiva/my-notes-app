import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Note as NoteType } from "@shared/models";
import EditorButtonsList from "./EditorButtonsList";

type NoteProps = {
	note: NoteType;
	onRemove: (noteId: number) => void;
	onUpdate: (uodatedNote: NoteType) => void;
};

const Note = ({ note, onRemove, onUpdate }: NoteProps) => {
	// Initializing the Tiptap editor with the note's content
	const contentEditor = useEditor({
		extensions: [
			StarterKit.configure({
				bulletList: {
					keepMarks: true, // Preserve text formatting within list items
				},
				orderedList: {
					keepMarks: true, // Preserve text formatting within ordered list items
				},
			}),
		],
		content: note.content, // Set the editor's initial content to the note's content
		editorProps: {
			attributes: {
				class: "focus:outline-none prose prose-sm font-medium min-h-32 text-lg",
			},
		},
		// On editor update, update the note's content
		onUpdate: ({ editor }) => {
			const updatedContent = editor.getHTML();

			onUpdate({
				...note,
				content: updatedContent,
			});
		},
	});

	if (!contentEditor) return null; // Return null if the editor isn't initialized

	return (
		<li className="relative max-w-[900px] mx-auto mb-4 bg-[rgb(46,46,46)] rounded-3xl shadow-md">
			<button
				className="absolute top-4 right-4 text-red-500 hover:opacity-85 transition text-2xl"
				aria-label="Delete"
				onClick={() => onRemove(note.id)}
			>
				✘
			</button>
			<div className="px-12 py-6 border-b-2 border-gray-300">
				<input
					className="w-full font-bold  h-12 text-2xl outline-none bg-transparent"
					type="text"
					value={note.title}
					maxLength={100}
					placeholder="Enter note title here..."
					onChange={(e) =>
						onUpdate({
							...note,
							title: e.target.value,
						})
					}
				/>
			</div>

			<div>
				<EditorButtonsList editor={contentEditor} />

				<div className="px-12 py-6">
					<div className="relative">
						{contentEditor.isEmpty ? (
							<span className="absolute font-medium text-lg text-gray-400 pointer-events-none">
								Write something...
							</span>
						) : null}
						<EditorContent editor={contentEditor} />
					</div>
				</div>
			</div>
		</li>
	);
};

export default Note;

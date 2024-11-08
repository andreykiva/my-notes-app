import { useNotesContext } from "../context/NotesContext";
import Loader from "./ui/Loader";
import NotesList from "./NotesList";

const NotesContainer = () => {
	const { loading, error, createNote } = useNotesContext();

	// If the notes are loading, display the Loader component (loading spinner)
	if (loading) {
		return <Loader />;
	}

	// If there is an error, display the error message
	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			<button
				className="fixed right-12 top-24 py-2 px-4 font-semibold text-lg hover:text-green-300"
				onClick={createNote}
			>
				+ Create New Note
			</button>

			<NotesList />
		</div>
	);
};

export default NotesContainer;

import { useEffect, useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import { useNotesContext } from "./context/NotesContext";
import NotesContainer from "./components/NotesContainer";

const App = () => {
	// State to track if it's the first app launch
	const [isFirstLaunch, setIsFirstLaunch] = useState(false);

	// State to track if at least one note has been created
	const [hasCreatedNote, setHasCreatedNote] = useState(false);

	const { notes, createNote } = useNotesContext();

	// Check first launch and set state
	useEffect(() => {
		const firstLaunch = localStorage.getItem("firstLaunch");
		
		// If there's no "firstLaunch" entry or it's not set to "false",
		// mark this as the first launch and update localStorage
		if (!firstLaunch || firstLaunch !== "false") {
			setIsFirstLaunch(true);
			localStorage.setItem("firstLaunch", "false");
		}
	}, []);

	// Handler for creating a new note, updates both note creation state and notes context
	const handleCreateNote = () => {
		createNote();
		setHasCreatedNote(true);
	};

	return (
		<div>
			<header className="w-full border-b border-y-gray-600 p-4">
				<h2 className="text-center text-2xl font-semibold">My Notes App</h2>
			</header>
			<main>
				{isFirstLaunch && !hasCreatedNote && notes.length === 0 ? (
					<WelcomeScreen onStart={handleCreateNote} />
				) : (
					<NotesContainer />
				)}
			</main>
		</div>
	);
};

export default App;

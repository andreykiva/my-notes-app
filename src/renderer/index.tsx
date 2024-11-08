import { createRoot } from "react-dom/client";
import "./assets/index.css";
import App from "./App";
import { NotesProvider } from "./context/NotesContext";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
	<NotesProvider>
		<App />
	</NotesProvider>
);

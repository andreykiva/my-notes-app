# My Notes App

## 📖 Overview
**My Notes App** is a simple, user-friendly application for creating and editing notes with automatic saving directly to your computer. You can easily add, edit, and delete text in your notes, giving you full control over your content. Designed for quick note-taking and organization, My Notes App ensures your notes are safe, accessible, and always up-to-date—without the need for cloud accounts or complicated setups.

## ✨ Features
- Welcome Screen: A friendly greeting on the first app launch with a button to "Create Your First Note."
![My Notes App Demo](https://github.com/andreykiva/my-notes-app/blob/main/src/renderer/assets/preview/create.gif)
- Create And Delete Notes: Easily create new notes and remove any note with a single click.
![My Notes App Demo](https://github.com/andreykiva/my-notes-app/blob/main/src/renderer/assets/preview/create_remove.gif)
- Rich Text Editing: Fully customize the content of your notes by highlighting text, creating lists, adding code snippets, and more.
![My Notes App Demo](https://github.com/andreykiva/my-notes-app/blob/main/src/renderer/assets/preview/edit.gif)
- Embed Images in Notes: Personalize your notes by inserting images directly, enriching content with visuals and enhancing clarity.
![My Notes App Demo](https://github.com/andreykiva/my-notes-app/blob/main/src/renderer/assets/preview/embed-images.gif)

## ⚙️ Tech Stack
This project is built with the following technologies:

- React: A JavaScript library for building user interfaces, used for creating the app's dynamic and responsive front-end.
- TypeScript: A superset of JavaScript that adds static typing, ensuring better code quality and reducing bugs.
- Electron: A framework for building cross-platform desktop apps using web technologies (HTML, CSS, JavaScript).
- electron-forge: A tool for managing the Electron app's build and packaging process, streamlining the app's deployment.
- Tailwind CSS: A utility-first CSS framework for styling the app, making it easy to design and maintain a clean, responsive layout.
- Tiptap React: A rich-text editor for React, providing powerful features for editing content (such as lists, images, code, etc.) within notes.
- Vitest & React Testing Library: Tools for unit testing and ensuring the app’s components work as expected, with Vitest for fast test execution and React Testing Library for component-based tests.

## 🧭 Project Structure
Here's an overview of the main directories in the project:

- `src/electron`
Contains the Electron-specific code for building and running the desktop application. This folder includes the main process, which controls the app's lifecycle, window creation, and interactions with native operating system features.

- `src/renderer`
Holds the React front-end code (renderer process) of the application. This is where the UI and business logic are implemented, using React, TypeScript, and other libraries.

- `src/shared`
This folder contains shared types and models used across both the Electron and React (renderer) processes. This is useful for code reusability and ensuring consistency throughout the app.

- `src/__tests__`
Contains unit tests for the project. The tests are written using Vitest and React Testing Library to ensure the components and functionality work as expected.

## 🏗️ Architecture

### Electron
1. Preload Script (`preload.ts`)
Sets up a secure bridge between the main and renderer processes using contextBridge.
Exposes methods:
- `getNotes`: Fetches notes.
- `saveNotes`: Saves notes.

2. Global Declaration for window Object (`preload.global.d.ts`)
Declares types for methods available through `window.api` in the renderer process.
Provides type safety for getNotes and saveNotes.

3. Main Process (`main.ts`)
Manages window creation and the app's lifecycle.
Handles IPC calls for loading and saving notes:
- `get-notes`: Loads notes.
- `save-notes`: Saves notes.
Enforces strict security settings (`contextIsolation, sandbox`).

4. IPC Communication
The renderer process calls methods through IPC (`ipcRenderer.invoke`).
The main process listens for these calls using `ipcMain.handle` and interacts with the notes file.

5. File Operations (`lib/index.ts`)
Reads and writes notes to a notes.json file in the user’s data directory.
Functions:
- `ensureFile`: Creates the file if it doesn’t exist.
- `loadNotes`: Reads notes.
- `saveNotes`: Saves notes.

6. Shared Types (types and models)
Types for safe interaction with notes:
- `GetNotes`: Function to fetch notes.
- `SaveNotes`: Function to save notes.
Note: Model for a note (id, title, content).

7. How It All Works
Renderer Process: Calls `window.api.getNotes()` or `window.api.saveNotes()`, which sends IPC messages to the main process.
Main Process: Listens for these messages and interacts with the `notes.json` file to read/save data.

8. Security
Context Isolation and Node Integration Disabled: Protects the renderer process from direct access to Node.js.
Sandboxing: Further restricts the renderer process’s privileges.

### React

1. React manages the UI with state and effects (e.g., `App.tsx`, `NotesContainer.tsx`).

2. Context API is used for state management (`NotesContext`), with a custom hook (`useNotes`) for handling notes operations like creating, updating, and deleting notes.

3. Notes are persisted via API calls to Electron's API (`notesService.ts`).

4. Tiptap editor allows rich text editing within notes.

Key custom hooks include:

- `useNotes` for managing note-related state.
- `useDebouncedSave` for saving notes after a delay.

## 🚀 Getting Started
Follow these instructions to get a local copy of the project up and running.

#### 1. Install Dependencies

```bash
cd my-notes-app
npm i
```

#### 2. Start the Project

```bash
npm run start
```

## 🛠️ Scripts
Here are the main commands for running, building, and testing the app:

- `npm start`: Starts the application in development mode using Electron.
- `npm run package`: Packages the application into an installable format.
- `npm run make`: Creates a distributable version of the app for different platforms.
- `npm run publish`: Publishes the packaged app (useful for deployment).
- `npm run lint`: Runs ESLint to check for code style and quality issues in .ts and .tsx files.
- `npm run test`: Runs all tests using Vitest and React Testing Library.
- `npm run test:renderer`: Runs renderer-specific tests with Vitest and React Testing Library.
- `npm run test:electron`: Runs Electron-related tests with Vitest.

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

## ⚙️ Tech Stack
This project is built with the following technologies:

- React: A JavaScript library for building user interfaces, used for creating the app's dynamic and responsive front-end.
- TypeScript: A superset of JavaScript that adds static typing, ensuring better code quality and reducing bugs.
- Electron: A framework for building cross-platform desktop apps using web technologies (HTML, CSS, JavaScript).
- electron-forge: A tool for managing the Electron app's build and packaging process, streamlining the app's deployment.
- Tailwind CSS: A utility-first CSS framework for styling the app, making it easy to design and maintain a clean, responsive layout.
- Tiptap React: A rich-text editor for React, providing powerful features for editing content (such as lists, code, etc.) within notes.
- Vitest & React Testing Library: Tools for unit testing and ensuring the app’s components work as expected, with Vitest for fast test execution and React Testing Library for component-based tests.

## 🧭 Project Structure
Here's an overview of the main directories in the project:

- `src/electron`
Contains the Electron-specific code for building and running the desktop application. This folder includes the main process, which controls the app's lifecycle, window creation, and interactions with native operating system features.

- `src/renderer`
Holds the React front-end code (renderer process) of the application. This is where the UI and business logic are implemented, using React, TypeScript, and other libraries.

- `src/shared`
This folder contains shared utilities, types, and constants used across both the Electron and React (renderer) processes. This is useful for code reusability and ensuring consistency throughout the app.

- `src/__tests__`
Contains unit and integration tests for the project. The tests are written using Vitest and React Testing Library to ensure the components and functionality work as expected.

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
- `npm run test`: Runs unit tests using Vitest.
- `npm run test`:renderer: Runs renderer-specific tests with Vitest.
- `npm run test`:electron: Runs Electron-related tests with Vitest.

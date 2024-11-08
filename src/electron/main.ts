import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { loadNotes, saveNotes } from "./lib";
import { SaveNotes } from "@shared/types";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	// Exit if the app was launched by Electron's squirrel startup (Windows installer).
	app.quit();
}

// Function to create the main window of the Electron application.
const createWindow = () => {
	// Create the browser window with specified dimensions and settings.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			contextIsolation: true, // Ensure the renderer process is isolated from the main process.
			nodeIntegration: false, // Disable Node.js integration for security.
			sandbox: true, // Enable sandboxing to prevent direct access to Node.js APIs.
			webviewTag: false, // Disable the <webview> tag to improve security.
			preload: path.join(__dirname, "preload.js"), // Path to the preload script that bridges communication between renderer and main process.
		},
	});

	// Load the app's index.html. If in development, load the URL from the Vite server.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(
			path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
		);
	}
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

// Re-create the window if the app is activated and no windows are open (macOS-specific behavior).
app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// Handle IPC calls for getting and saving notes.
ipcMain.handle("get-notes", () => loadNotes()); // Calls the loadNotes function to fetch all notes.
ipcMain.handle("save-notes", (_, ...args: Parameters<SaveNotes>) => saveNotes(...args)); // Calls the saveNotes function to save the provided notes.

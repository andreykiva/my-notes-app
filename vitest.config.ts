/// <reference types="vitest/globals" />
import { defineConfig } from "vitest/config";
import path from 'path';

export default defineConfig({
	test: {
		environment: "jsdom",
		globals: true,
	},
	resolve: {
		alias: {
			"@shared": path.resolve(__dirname, "src/shared"),
			"@renderer": path.resolve(__dirname, "src/renderer"),
			"@electron": path.resolve(__dirname, "src/electron"),
		},
	},
});

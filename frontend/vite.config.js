import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "./src/components"),
			"@data": path.resolve(__dirname, "./src/data"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@styles": path.resolve(__dirname, "./src/styles"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@api": path.resolve(__dirname, "./src/api"),
		},
	},
});

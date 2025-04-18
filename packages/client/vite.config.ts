import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: Number(process.env.CLIENT_PORT) || 5173,
	},
});

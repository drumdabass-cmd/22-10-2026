import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" делает пути относительными, поэтому сайт работает и на github.io/репозиторий, и на своём домене.
export default defineConfig({ plugins: [react()], base: "./" });

import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "Squama UI",
            fileName: "index",
        },
        sourcemap: false,
        emptyOutDir: false,
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
    css: {
        modules: {
            generateScopedName:
                process.env.NODE_ENV === "production"
                    ? "[hash:base64]"
                    : "[local]_[hash:base64:5]",
        },
    },
});

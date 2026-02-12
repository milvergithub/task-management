/// <reference types="vitest" />

import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react-swc"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import path from "node:path"

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    test: {
        globals: true,
        environment: "jsdom",

        setupFiles: "./src/test/setup.ts",

        include: ["src/**/*.{test,spec}.{ts,tsx}"],

        coverage: {
            provider: "v8",
            reporter: ["text", "html"],
            reportsDirectory: "./coverage",
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            lines: 70,
            functions: 70,
            branches: 70,
            statements: 70,
            exclude: [
                "node_modules",
                "src/main.tsx",
                "src/vite-env.d.ts",
                "**/*.d.ts",
                "src/components/ui/**", // shadcn
                "src/styles/**",
                "**/*.config.{ts,js}",
            ],
        },
    },
})

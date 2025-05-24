import { defineConfig } from "cypress";

export default defineConfig({
    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
        },
    },
    e2e: {
        baseUrl: "http://localhost:5173", // URL do seu projeto Vite
        supportFile: "cypress/support/e2e.ts",
    },
});

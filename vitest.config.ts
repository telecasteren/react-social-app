import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [
      "**/node_modules/**",
      "**/tests/e2e/**",
      "**/src/routeTree.gen.ts**",
    ],
  },
});

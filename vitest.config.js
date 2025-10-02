import { defineConfig } from "vite";
const jsdom = require("jsdom");

export default defineConfig({
  test: {
    globals: true,
    environment: jsdom,
    exclude: ["**/node_modules/**", "**/tests/e2e/**"],
  },
});

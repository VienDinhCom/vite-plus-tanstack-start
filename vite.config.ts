import { defineConfig } from "vite-plus";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    devtools(),
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],

  fmt: {
    ignorePatterns: ["src/routeTree.gen.ts"],
    overrides: [
      {
        files: ["src/**"],
        options: {
          sortTailwindcss: {
            functions: ["cn"],
            stylesheet: `src/assets/styles/global.css`,
            preserveWhitespace: false,
          },
        },
      },
    ],
  },
  lint: {
    ignorePatterns: ["src/routeTree.gen.ts"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
    overrides: [
      {
        files: ["src/routes/**/*.tsx"],
        rules: {
          "unicorn/filename-case": "off",
        },
      },
    ],
  },
  resolve: { tsconfigPaths: true },
  staged: { "*": "vp check --fix" },
});

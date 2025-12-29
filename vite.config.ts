import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";

import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, path.resolve(process.cwd(), "config"), "");
  return {
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),

      quasar({
        sassVariables: "src/styles/main",
      }),
    ],
    css: {
      devSourcemap: true,
    },
    build: {
      sourcemap: true,
    },
    server: {
      port: env.VITE_SERVER_PORT ? parseInt(env.VITE_SERVER_PORT) : 3030,
      open: `http://localhost:${parseInt(env.VITE_SERVER_PORT)}/`,
    },
    define: { "process.env": {} },
  };
});

import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  preset: "vercel",
  serveStatic: true,
  noAnalyze: true,
  rollupConfig: {
    output: {
      dir: ".vercel/output/functions/index.func",
    },
  },
});

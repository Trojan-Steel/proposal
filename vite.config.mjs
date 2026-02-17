import { defineConfig } from "vite";

const proposalPort = Number.parseInt(process.env.PROPOSAL_PORT || "4174", 10);

export default defineConfig({
  server: {
    proxy: {
      "/proposal-api": {
        target: `http://localhost:${proposalPort}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proposal-api/, ""),
      },
    },
  },
});

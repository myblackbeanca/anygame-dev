import { defineConfig } from 'vitest/config';

// Standalone test config so the suite spans BOTH the client app and the worker.
// (vite.config.ts sets root: 'client', which would otherwise scope vitest to the
// client tree and silently skip workers/**.) Tests use relative imports, so no
// path aliases or framework plugins are needed here.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['client/src/**/*.test.ts', 'workers/**/*.test.js'],
  },
});

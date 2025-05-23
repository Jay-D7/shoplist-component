import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // <-- add this line
    environment: 'jsdom',
  },
});

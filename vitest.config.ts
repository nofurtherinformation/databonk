import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    exclude: ['tests/benchmark/**'],
    globals: true,
    testTimeout: 30000, // 30 seconds for integration tests
  },
});

import { mergeConfig, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
      css: false,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/**/*.test.{ts,tsx}', 'src/test/**', 'src/main.tsx'],
        // Set below the measured values (stmts/lines ~99.9, funcs ~92.5,
        // branches ~88) to leave headroom; ratchet up as coverage improves.
        thresholds: {
          statements: 99,
          lines: 99,
          functions: 90,
          branches: 85,
        },
      },
    },
  }),
);

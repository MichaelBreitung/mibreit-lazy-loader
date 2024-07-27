import { defineConfig } from 'vite';

import strip from '@rollup/plugin-strip';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    poolOptions: {
      threads: {
        singleThread: true, // because we are interacting with the browser
      },
    },
  },
  css: {
    modules: {
      generateScopedName: 'mbll__[local]', // mbg prefix for mibreit gallery
    },
  },
  build: {
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      preserveEntrySignatures: true,
      input: 'src/index.ts',
      output: [
        {
          format: 'esm',
          dir: 'lib',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
        {
          dir: 'lib-cjs',
          format: 'cjs',
          entryFileNames: `index.cjs`,
        },
        {
          dir: 'lib-iife',
          format: 'iife',
          name: 'mibreitLazyLoader',
          entryFileNames: 'mibreitLazyLoader.min.js',
          exports: 'named',
        },
      ],
      plugins: [
        strip({
          include: ['src/**/*.ts'],
          functions: ['console.*'],
        }),
      ],
    },
  },
});

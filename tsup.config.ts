import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/api/**/*.ts', 'src/services/**/*.ts'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  sourcemap: true,
  clean: true,
  dts: true,
});

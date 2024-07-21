import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/api'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true
});

import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/server/index.ts',
  output: {
    dir: 'build',
    format: 'cjs',
  },
  plugins: [
    json(),
    typescript({
      tsconfig: './tsconfig.prod.json'
    }),
  ],
}

import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/server/index.ts',
  output: {
    dir: 'build',
    format: 'cjs',
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.prod.json'
    }),
  ],
}

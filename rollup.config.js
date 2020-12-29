import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/server/index.ts',
    output: {
      dir: 'build/server',
      format: 'es',
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json'
      }),
    ],
  },
  {
    input: 'src/client/client.tsx',
    output: {
      dir: 'build/client',
      format: 'es',
    },
    plugins: [
      replace({
        // Fixes https://github.com/rollup/rollup/issues/487:
        'process.env.NODE_ENV': JSON.stringify( 'production' )
      }),
       // Bundle imported node_modules in output:
      nodeResolve(),
      // Convert CommonJS modules to ES6:
      // Fixes: https://github.com/rollup/rollup-plugin-commonjs/issues/201:
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
    ],
  },
]

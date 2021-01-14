import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const serverOutputFilename = 'index.js';

export default [
  {
    input: 'src/server/index.ts',
    output: {
      dir: 'build/server',
      format: 'cjs',
    },
    plugins: [
      // TODO: Bundle imported node_modules in output?
      // Dont output CSS in server bundle:
      ignoreExtensionsRollupPlugin(['css']),
      replace({
        // Replace global vars to allow for more efficient tree shaking/dead code removal.
        // We avoid final replacement in output bundle, since there are certain occurences we don't want to replace.
        '__IS_MOCK_MODE__': (id) => id === serverOutputFilename ? '__IS_MOCK_MODE__' : 'false',
        '__NODE_ENV__': (id) => id === serverOutputFilename ? '__NODE_ENV__' : JSON.stringify( 'production' ),
        exclude: ['src/common/globals.ts', 'src/server/index.ts'],
      }),
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
      // Add support for import './style.css'
      // TODO: Extract CSS to separate file?
      // Ref https://florian.ec/blog/rollup-scss-css-modules/
      postcss(),
      replace({
        // Fixes https://github.com/rollup/rollup/issues/487
        'process.env.NODE_ENV': JSON.stringify( 'production' )
      }),
      // Bundle imported node_modules in output:
      nodeResolve(),
      // Convert CommonJS modules to ES6:
      // Fixes: https://github.com/rollup/rollup-plugin-commonjs/issues/201
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
    ],
  },
]

/**
 * Inspired by:
 * https://github.com/home-assistant/frontend/blob/dev/build-scripts/rollup-plugins/ignore-plugin.js
 */
function ignoreExtensionsRollupPlugin (extensions = []) {
  if (extensions.length === 0) {
    return {
      name: "ignore",
    };
  }

  return {
    name: "ignore",
    load(id) {
      return extensions.some((extension) => id.endsWith(extension))
        ? {
            code: "",
          }
        : null;
    },
  };
};

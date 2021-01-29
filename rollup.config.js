import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const clientOutputFilename = 'client.js';
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
      // Dont output regular CSS in server bundle...
      ignoreExtensionsRollupPlugin({
        extensions: ['.css']
      }),
      // ...But have support for CSS modules (required for generating correct classNames in markup)
      postcss(),
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
      postcss({
        // Extract CSS to separate file, ref https://florian.ec/blog/rollup-scss-css-modules/
        extract: true,
        plugins: [
          postcssImport(),
        ],
      }),
      replace({
        // Fixes https://github.com/rollup/rollup/issues/487
        'process.env.NODE_ENV': JSON.stringify( 'production' ),
        // Replace global vars to allow for more efficient tree shaking/dead code removal.
        // We avoid final replacement in output bundle, since there are certain occurences we don't want to replace.
        '__NODE_ENV__': (id) => id === clientOutputFilename ? '__NODE_ENV__' : JSON.stringify( 'production' ),
        exclude: ['src/common/globals.ts'],
      }),
      // Copy fonts
      copy({
        targets: [{
          src: 'src/client/fonts/*',
          dest: 'build/client/fonts',
        }],
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
 * Ignore specific file extensions in the Rollup pipeline.
 * 
 * Usage:
 * ignoreExtensionsRollupPlugin({
 *    extensions: ['.css']
 * })
 * 
 * Note that by passing '.css' to extensions, you're ignoring 
 * _only_ files with the following filename structure: style.css.
 * mycomponent.module.css will not be ignored. 
 * To ignore that, add '.module.css' to extensions.
 * In other words, everything in the filename, starting from the first dot,
 * has to match the extension in extensions in order to be ignored.
 * 
 * Inspired by:
 * https://github.com/home-assistant/frontend/blob/dev/build-scripts/rollup-plugins/ignore-plugin.js
 */
function ignoreExtensionsRollupPlugin ({extensions = []}) {
  if (extensions.length === 0) {
    return {
      name: "ignore",
    };
  }

  return {
    name: "ignore",
    load(id) {
      const currentFileExtension = id.substring(id.indexOf('.'));
      const doIgnore = extensions.some((extension) => extension === currentFileExtension);

      return doIgnore
        ? {
            code: "",
          }
        : null;
    },
  };
};

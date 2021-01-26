/**
 * TODO: Once the Snowpack JS API is fully documented and ready,
 * the goal is to use this file in `npm run dev`, so we can start/restart 
 * the web server only _after_ snowpack has transpiled our code.
 * For now, we're using the CLI API with a snowpack.config.js, which
 * gives a `ERR_MODULE_NOT_FOUND` before the files are transpiled, but
 * eventually succeeds. The goal of eventually using this file is to 
 * ensure a smoother dev experience.
 * 
 * References:
 * https://www.snowpack.dev/reference/javascript-interface
 * https://www.snowpack.dev/reference/cli-command-line-interface
 * https://www.snowpack.dev/reference/configuration
 */

import { buildProject } from 'snowpack';
import nodemon from 'nodemon';

buildProject({config: {
  buildOptions: {
    clean: false,
    out: './dev',
    metaDir: '__snowpack__',
    webModulesUrl: 'web_modules',
  },
  experiments: {
    ssr: false,
  },
  exclude: [],
  _extensionMap: [], // Or Record<string, string>?
  installOptions: {
    // Add all server packages here:
    externalPackage: ['fs', 'path', 'googleapis', 'express'],
    polyfillNode: true,
  },
  mount: {
    './src': {
      url: '/',
    },
  },
  plugins: [
    '@snowpack/plugin-typescript'
  ],
  testOptions: {
    files: ["__tests__/**/*", "**/*.@(spec|test).*"],
  }
}}).then(() => {
  console.log('--- BUILD FINISHED ---');
  // Start server, not sure if this works.
  nodemon({
    script: 'scripts/dev.js',
    args: {
      'experimental-specifier-resolution': 'node',
    }
  })
});

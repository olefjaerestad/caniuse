module.exports = {
  buildOptions: {
    out: 'dist',
  },
  packageOptions: {
    // Add all server packages here:
    external: [
      'express',
      'fs',
      'fsevents',
      'googleapis',
      'http',
      'https',
      'path',
      'util',
      'url',
      'ws'
    ],
    polyfillNode: true,
  },
  mount: {
    'src': '/',
  },
  plugins: [
    '@snowpack/plugin-typescript',
    // ['@snowpack/plugin-typescript', {
    //   args: '--project tsconfig.json',
    // }],
    'snowpack-plugin-relative-css-urls',
  ],
}

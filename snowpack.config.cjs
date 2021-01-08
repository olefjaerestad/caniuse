module.exports = {
  buildOptions: {
    out: 'dist',
  },
  installOptions: {
    // Add all server packages here:
    externalPackage: [
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
  ],
}

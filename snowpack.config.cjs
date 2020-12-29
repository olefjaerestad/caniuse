module.exports = {
  buildOptions: {
    out: 'dist',
  },
  installOptions: {
    // Add all server packages here:
    externalPackage: ['fs', 'path', 'googleapis', 'express'],
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

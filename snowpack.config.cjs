module.exports = {
  buildOptions: {
    out: process.env.NODE_ENV === 'production' ? 'build' : 'dist'
  },
  installOptions: {
    installTypes: true,
  },
  mount: {
    'src/client': '/client',
    'src/common': '/common',
  }
}

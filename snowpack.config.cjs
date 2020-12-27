module.exports = {
  buildOptions: {
    out: 'dist'
  },
  installOptions: {
    installTypes: true,
  },
  mount: {
    'src/client': '/client',
    'src/common': '/common',
  }
}

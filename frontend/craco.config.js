const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@utils': path.resolve(__dirname, 'src', 'utils'),
    },
  },
}

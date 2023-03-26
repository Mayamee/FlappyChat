const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@UI': path.resolve(__dirname, 'src', 'components', 'UI'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@utils': path.resolve(__dirname, 'src', 'utils'),
      '@validation': path.resolve(__dirname, 'src', 'validation'),
    },
  },
}

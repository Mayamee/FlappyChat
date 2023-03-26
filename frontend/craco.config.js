const path = require('path')

const srcPath = path.resolve(__dirname, 'src')

module.exports = {
  webpack: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
      '@assets': path.join(srcPath, 'assets'),
      '@images': path.join(srcPath, 'assets', 'images'),
      '@icons': path.join(srcPath, 'assets', 'icons'),
      '@components': path.join(srcPath, 'components'),
      '@UI': path.join(srcPath, 'components', 'UI'),
      '@pages': path.join(srcPath, 'pages'),
      '@utils': path.join(srcPath, 'utils'),
      '@validation': path.join(srcPath, 'validation'),
    },
  },
}

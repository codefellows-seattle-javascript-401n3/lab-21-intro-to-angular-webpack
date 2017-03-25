'use strict';

const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  entry: `${__dirname}/app/index.js`,
  output: {
    filename: 'bundle.js',
    path: 'build',
  },
  plugins: [
    new HTMLPlugin({
      template: `${__dirname}/app/index.html`,
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use:['style-loader', 'css-loader', 'sass-loader']
      },
    ],
  },
};

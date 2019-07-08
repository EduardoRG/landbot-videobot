const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => ({
  entry: {
    'main': './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'umd',
    library: ['Landbot', 'Typed'],
    libraryExport: 'default',
  },
  resolve: {
    alias: {
      'components': path.resolve(__dirname, './src/components'),
      'context': path.resolve(__dirname, './src/context'),
      'core': path.resolve(__dirname, './src/core'),
      'helpers': path.resolve(__dirname, './src/helpers'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": ["@babel/preset-env", "@babel/preset-react"],
            "plugins": [
              ["@babel/plugin-proposal-object-rest-spread"],
              ["@babel/plugin-proposal-class-properties"],
              ["@babel/plugin-transform-runtime", {
                "regenerator": true,
              }],
            ]
          },
        }
      },
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: 'public/main.css' },
    ]),
  ],
});
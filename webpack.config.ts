import path from 'path';
import { Configuration } from 'webpack';
import * as slsw from 'serverless-webpack';
import nodeExternals from 'webpack-node-externals';

const config: Configuration = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    alias: {
      '@functions': path.resolve(__dirname, './src/functions'),
      '@libs': path.resolve(__dirname, './src/libs'),
      '@services': path.resolve(__dirname, './src/services'),
      '@models': path.resolve(__dirname, './src/models'),
    },
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

export default config;

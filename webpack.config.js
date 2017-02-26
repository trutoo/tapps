var path = require('path');
var extend = require('webpack-merge');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

module.exports = function (env) {

  //var PROD = process.argv.indexOf('--production') != -1 || process.env.NODE_ENV == 'production';
  var PROD = env && env.production ? true : false;
  //------------------------------------------------------------------------------------
  // COMMON CONFIG FOR DEV AND PROD
  //------------------------------------------------------------------------------------

  var config = {
    context: path.resolve(process.cwd(), 'src'),

    entry: {
      'polyfill': './polyfill.ts',
      'vendor': './vendor.ts',
      'main': './main.ts',
    },

    resolve: {
      modules: [
        path.resolve(process.cwd(), 'src'),
        'node_modules'
      ],
      extensions: ['.ts', '.js'],
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: '@angularclass/hmr-loader',
              options: {
                pretty: !PROD,
                prod: PROD,
              },
            },
            'awesome-typescript-loader',
            'angular2-template-loader'
          ],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[hash].[ext]',
          },
        },
        {
          test: /\.css$/,
          exclude: [
            path.resolve(process.cwd(), 'src/tapps'),
          ],
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader", options: {
                  sourceMap: !PROD,
                  minification: PROD,
                }
              },
              {
                loader: "postcss-loader", options: {
                  config: path.resolve(process.cwd(), 'src/styles/postcss.config.js'),
                }
              },
            ]
          })
        },
        {
          test: /\.css$/,
          include: [
            path.resolve(process.cwd(), 'src/tapps'),
          ],
          use: [
            {
              loader: "raw-loader",
            },
            {
              loader: "postcss-loader", options: {
                config: path.resolve(process.cwd(), 'src/styles/postcss.config.js'),
              }
            },
          ],
        },
      ],
    },

    plugins: [
      // Workaround for angular/angular#11580
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        path.resolve(process.cwd(), 'src/')
      ),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['main', 'vendor', 'polyfill'],
      }),
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
      new CheckerPlugin(),
    ],
  };

  if (PROD) {

    //------------------------------------------------------------------------------------
    // PRODUCTION SPECIFIC CONFIG
    //------------------------------------------------------------------------------------

    config = extend(true, config, {

      output: {
        path: path.join(process.cwd(), 'dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
      },

      plugins: [
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.NoErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          htmlLoader: {
            minimize: false // workaround for ng2
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          output: {
            comments: false,
          },
          compressor: {
            warnings: false,
          },
          mangle: {
            keep_fnames: true
          }
        }),
        new webpack.DefinePlugin({
          'process.env': {
            'ENV': '"production"',
          },
        }),
      ],

    });

  } else {

    //------------------------------------------------------------------------------------
    // DEVELOPMENT SPECIFIC CONFIG
    //------------------------------------------------------------------------------------

    config = extend(true, config, {

      output: {
        path: path.join(process.cwd(), 'build'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
      },

      plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.LoaderOptionsPlugin({
          debug: true
        }),
        new webpack.DefinePlugin({
          'process.env': {
            'ENV': '"development"',
          },
        }),
        new webpack.NamedModulesPlugin(),
      ],

      devServer: {
        historyApiFallback: true,
        stats: 'minimal'
      },

      devtool: 'cheap-module-eval-source-map',
    });
  }

  //------------------------------------------------------------------------------------
  // EXPORT
  //------------------------------------------------------------------------------------

  return config;
};
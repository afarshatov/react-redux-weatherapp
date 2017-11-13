'use strict';

const env = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let plugins = [
    new HtmlWebpackPlugin({
        template: __dirname + '/app/index.html',
        filename: 'index.html',
        inject: 'body'
    })
];

if (env === 'production') {
    plugins = [
        ...plugins,
        new ExtractTextPlugin('css/styles.css'),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
        })
    ];
}


module.exports = {
    entry: [
        './app/index.js'
    ],
    output: {
        path: __dirname + '/public',
        filename: 'js/bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: 'babel-loader',
            query: {
                presets: ['es2015', 'react', 'stage-3']
            }
        }, {
            test: /\.css$/,
            loader: env === 'production'
                ? ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
                : 'style-loader!css-loader'
        }, {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            loader: 'file-loader',
            options: {
                name: 'images/[path][name].[ext]',
                context: 'app/components'
            }
        }]
    },
    plugins: plugins,
    watch: true,
    devServer: {
        port: 8081,
        hot: true
    },
    devtool: 'source-map'
}
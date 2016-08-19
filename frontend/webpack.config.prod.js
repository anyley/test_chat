/**
 * Created by diver on 15.08.16.
 */
'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname + '/src',
    entry: {
        app: "./app"
    },
    output: {
        path: __dirname + "/public",
        filename: "[name].[chunkhash:6].js",
        publicPath: "/"
    },

    devtool: null,

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: [ 'es2015', 'react' ],
                    plugins: [ 'transform-runtime' ]
                }
            },
            { test: /\.jade$/, loader: 'jade' },
            { test: /\.css$/,  loader: 'style-loader!css-loader' },
            { test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/, loader: 'file' },
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: 'production',
            LANG: "'ru'"
        }),

        new webpack.NoErrorsPlugin(),

        new HtmlWebpackPlugin({
            title: 'Production mode',
            template: 'index.ejs'
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_console: true,
                warnings:     false,
                unsafe:       true
            }
        })
    ]
};

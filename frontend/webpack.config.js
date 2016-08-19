/**
 * Created by diver on 15.08.16.
 */
'use strict';

const webpack           = require('webpack');
const path              = require('path');
const Dashboard         = require('webpack-dashboard');
const DashboardPlugin   = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dashboard       = new Dashboard();
const NODE_ENV        = process.env.NODE_ENV || 'development';


module.exports = {
    context: __dirname + '/src',
    entry: { app: "./app.jsx" },
    output: {
        path: __dirname + "/public",
        filename: "[name].js",
        publicPath: "/"
    },

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: 'eval', // 'cheap-inline-module-source-map',

    devServer: {
        contentBase: __dirname + '/public',
        quiet: true,
        historyApiFallback: true,
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['react-hot', 'babel'],
            },
            { test: /\.css$/,  loader: 'style-loader!css-loader' },
            { test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/, loader: 'file' },
        ]
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: "'ru'"
        }),
        new HtmlWebpackPlugin({
            title: 'Development mode',
            template: 'index.ejs'
        }),
        new DashboardPlugin(dashboard.setData),
    ]
};


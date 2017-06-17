
'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {

    entry: {
        'vendor': ['angular', 'angular-animate', 'angular-aria', 'angular-messages', 'angular-material', 'angular-material-icons', '@uirouter/angularjs'],
        'app': path.resolve(__dirname, 'src/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/[name].bundle.js'
    },
    module: {
        rules: [
            // Load JS Files
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    }
                }
            },
            // Load HTML
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            // Load CSS
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            // Load Images
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            // Load Fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor'],
            async: true
        }),

        new HtmlWebpackPlugin({
            title: 'Testing',
            template: path.resolve(__dirname, 'src/index.html')
        }),

        new ExtractTextPlugin("[name].css"),
    ]
};
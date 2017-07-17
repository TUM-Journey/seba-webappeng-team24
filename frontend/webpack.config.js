
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
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
                // include: path.resolve(__dirname, '/src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env'],
                            plugins: [
                                [
                                    "transform-runtime",
                                    {
                                        "polyfill": false,
                                        "regenerator": true
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            // {
            //     test: /\.js$/,
            //     exclude: /(node_modules)/,
            //     loader: 'transform-loader?envify',
            //     include: path.resolve(__dirname, 'src/'),
            //     enforce: "pre",
            // },
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
            // Load Json

            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            },
        ]
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            'url': '',
        }),
        // new UglifyJSPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor'],
            async: true
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }),

        new ExtractTextPlugin("[name].css"),

        new webpack.BannerPlugin("SEBA-TEAM-24"),
    ],
    // Webpack dev server configuration
    devServer: {

        watchOptions: {
            poll: 1000
        },

        compress: true,
        port: 8000
    }

};


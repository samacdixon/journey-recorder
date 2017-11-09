const path = require('path');
const combineLoaders = require('webpack-combine-loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        background: './src/background/index.js',
        content: [
            './webpack/configure.js',
            './src/content/index.js'
        ],
        popup: './src/popup/index.js'
    },

    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../', 'build'),
        publicPath: '/'
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules', 'src'],
        alias: {
            styles: path.resolve(__dirname, '../src/[name]/assets/styles'),
            lib:  path.resolve(__dirname, '../src/lib'),
            state:  path.resolve(__dirname, '../src/state'),
            config:  path.resolve(__dirname, '../src/config'),
        }
    },

    module: {
        loaders: [{
            test: /\.(jsx|js)?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: path.join(__dirname, '../', 'src'),
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
        }, {
            test: /\.(png|jpg|svg)$/,
            loader: 'file-loader?name=assets/images/[name].[ext]'
        }]
    },
    plugins: [
        new ExtractTextPlugin('assets/styles/[name].css', {
            allChunks: true
        })
    ]
};
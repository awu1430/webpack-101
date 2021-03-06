var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var rootDir = __dirname;
var srcDir = rootDir + "/src";
var distDir = rootDir + "/dist";

module.exports = {
    context: rootDir, // a base directory to resolve the “entry”

    entry: {
        entry1: srcDir + '/entry1.js',
        entry2: srcDir + '/entry2.js'
    },

    output: {
        path: distDir,
        filename: "[name].js" // [name] means we are going to use the "key" value of each entry as the bundle file name
    },

    resolve: {
        extensions: ['', '.js', '.jsx'] // resolve file extentions so that we don't have to specify the extention for js and jsx files
    },

    // loaders for different types of resources. For jsx and es6, we uses babel loader.
    module: {
        loaders: [
            { test: /\.html$/, exclude: /tmp/, loader: "ng-cache-loader" },
            { test: /\.jsx?$/, exclude: /(node_modules|tmp)/, loader: 'babel-loader' },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.(png|jpg|woff|woff2|eot|ttf|otf)/, loader: 'url-loader' },
            { test: /\.svg/, loader: 'file?name=/img/[hash].[ext]?' },
            { test: /\.less/, loader: "style-loader!css-loader!less-loader" }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "commons.js",
            chunks: ["entry1", "entry2"]
        }),
        new HtmlWebpackPlugin({
            title: 'Boxes',
            filename: '/entry1.html', // relative path from "output" directory
            template: srcDir + '/entry1.html' // source file
        }),
        new HtmlWebpackPlugin({
            title: 'Circles',
            filename: '/entry2.html', // relative path from "output" directory
            template: srcDir + '/entry2.html' // source file
        })
    ]
};

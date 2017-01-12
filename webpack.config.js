
var path = require('path');

var dir_js = path.resolve(__dirname, 'mylib');
var dir_build = path.resolve(__dirname, 'build');

var dir_html = path.resolve(__dirname, 'html');
var dir_css = path.resolve(__dirname, 'css');

var es3ifyPlugin = require('es3ify-webpack-plugin');


module.exports = {
    entry: path.resolve(dir_js, 'entry.js'),
    output: {
        path: dir_build,
        filename: "bundle.js"
    },

    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {
                test: /\.js|jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'],
                    compact: false
                }
            },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        //alias: {
        //    echarts: "js/echarts.min.js"
        //}
    },
    plugins: [
        // ie 8
        new es3ifyPlugin(),
    ],
    externals:{
    }
};
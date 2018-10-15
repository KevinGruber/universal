// Work around for https://github.com/angular/angular-cli/issues/7200

const path = require('path');
const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        "server": path.join(__dirname, 'index.ts'),
        "prerender": path.join(__dirname, 'prerender/prerender.ts')
    },
    target: 'node',
    devtool: "source-map",
    optimization: {
        minimize: false
    },
    node: {
        __dirname: false
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({
            configFile: path.join(__dirname, 'tsconfig.json')
        })]
    },
    externals: [/(node_modules|main\..*\.js)/],
    output: {
        path: path.join(__dirname, '../../dist/server'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }]
    },
    plugins: [
        new ProgressPlugin((percentage, msg) => {
            console.log((percentage * 100).toFixed(2) + '%', msg);
        }),
        new webpack.ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            path.join(__dirname, 'src'), {}
        ),
        new webpack.ContextReplacementPlugin(
            /environment/,
            path.join(__dirname, 'environments/environment'), {}
        ),
        new webpack.ContextReplacementPlugin(
            /(.+)?express(\\|\/)(.+)?/,
            path.join(__dirname, 'src'), {}
        )
    ]
};
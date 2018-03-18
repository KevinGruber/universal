// Work around for https://github.com/angular/angular-cli/issues/7200

const path = require('path');
// noinspection NpmUsedModulesInstalled
const webpack = require('webpack');
// noinspection JSUnresolvedFunction
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: {
        "server": path.join(__dirname, './index.ts'),
        "prerender": path.join(__dirname, './prerender/prerender.ts')
    },
    target: 'node',
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({
            configFile: path.join(__dirname, './src/server/tsconfig.json')
        })]
    },
    externals: [/(node_modules|main\..*\.js)/,],
    output: {
        path: path.join(__dirname, '../../', 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            path.join(__dirname, '../../src/client'), {}
        ),
        new webpack.ContextReplacementPlugin(
            /(.+)?express(\\|\/)(.+)?/,
            path.join(__dirname, '../../src/client'), {}
        )
    ]
};
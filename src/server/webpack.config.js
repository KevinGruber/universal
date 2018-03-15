// Work around for https://github.com/angular/angular-cli/issues/7200

const path = require('path');
// noinspection NpmUsedModulesInstalled
const webpack = require('webpack');

// noinspection JSUnresolvedFunction
module.exports = {
    entry: {
        "server": './index.ts',
        "prerender": './prerender/prerender.ts'
    },
    target: 'node',
    resolve: {
        extensions: ['.ts', '.js']
    },
    externals: [/(node_modules|main\..*\.js)/,],
    output: {
        path: path.join(__dirname, 'dist'),
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
            path.join(__dirname, 'src'), {}
        ),
        new webpack.ContextReplacementPlugin(
            /(.+)?express(\\|\/)(.+)?/,
            path.join(__dirname, 'src'), {}
        )
    ]
};
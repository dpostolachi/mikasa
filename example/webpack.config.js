const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const rupture = require('rupture')
const nib = require('nib')

const Env = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development'
console.log('Running Webpack: ' + Env)

const PATHS = {
    input: path.join(__dirname, 'client/main.js'),
    output: path.join(__dirname, '/public/bundle'),
}

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(Env)
        }
    }),
    new ExtractTextPlugin('style.css'),
]

if (Env === 'production')
    plugins.push(new webpack.optimize.UglifyJsPlugin())

module.exports = {
    entry: {
        js: ['babel-polyfill', PATHS.input],
    },
    target: 'web',
    output: {
        path: PATHS.output,
        filename: 'bundle.js',
    },
    devtool: (Env !== 'production ') ? 'source-map' : false,
    module: {
        rules: [
            {
                test: /(\.jsx?$|\.js?$)/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: { loader: 'style-loader' },
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'stylus-loader',
                            options: {
                                use: [rupture(), nib()]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            },
        ]
    },
    plugins: plugins
}

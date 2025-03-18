// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from 'path';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';

const isProduction = (envVar) => envVar == 'production';

const __dirname = path.resolve();

const babelOptions = {
    presets: ['@babel/preset-env', '@babel/preset-react'],
};

const buildConfig = (env, argv) => ({
    context: path.resolve(__dirname),
    devtool: 'inline-source-map',
    devServer: {
        host: 'localhost',
        open: true,
        port: 9229,
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
    },
    entry: {
        home: ['@babel/polyfill', path.resolve(__dirname, 'src/client/pages/home.js')],
    },
    output: {
        filename: '[name]-[chunkhash].min.js',
        path: path.resolve(__dirname, 'dist/bundles'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions,
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions,
                    },
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commonVendors: {
                    test: /^.*node_modules[\/\\](?!).*$/,
                    name: 'nlpssaVendor',
                    chunks: 'initial',
                },
                commons: {
                    test: /[\/\\]src\/common[\/\\]/,
                    name: 'nlpssaCommon',
                    chunks: 'initial',
                    enforce: true,
                },
            },
        },
        // minimizer: argv.mode === 'production' ? [new TerserPlugin()] : [],
    },
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    plugins: getPlugins(argv.mode),
    resolve: {
        alias: {
            client: path.resolve(__dirname, 'src/client'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
});

function getPlugins(mode) {
    const commonPlugins = [new WebpackAssetsManifest({})];

    return isProduction(mode) ? [...commonPlugins, new WorkboxWebpackPlugin.GenerateSW()] : [...commonPlugins];
}

export default (env, argv) => {
    const config = buildConfig(env, argv);

    return config;
};
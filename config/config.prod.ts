import { defineConfig } from 'umi';
import { withChainWebpack } from 'big3-adaptive-media-loader';

const ZipPlugin = require('@dogedefi/zip-webpack-plugin');

export default defineConfig({
    define: {
        'process.env.HASURA_API': '/api/hasura-cache/v1/graphql',
        'process.env.HASURA_ADMIN_SECRET': '',
        'process.env.RPC_NODE_1': '',
        'process.env.RPC_NODE_2': '',
        'process.env.RPC_NODE_3': '',
        'process.env.CHAIN_ENV': 'prod',
        'process.env.EKS': '',
    },
    hash: true,
    targets: {
        chrome: 79,
        firefox: false,
        safari: false,
        edge: false,
        ios: false,
    },
    devtool: false,
    terserOptions: {}, // gzipped is better than esbuild
    chunks: ['vendors', 'antdesigns', 'commons', 'umi'],
    inlineLimit: 3000, // 3k
    chainWebpack(memo) {
        withChainWebpack(memo, [
            { designDraft: [0, 800], rule: 'mobile', regex: /mobile\.less$/ },
            { designDraft: 801, rule: 'desktop', regex: /index\.less$/ },
        ]);
        memo.cache({
            type: 'filesystem',
            allowCollectingMemory: true,
            buildDependencies: {
                config: [__filename],
            },
        });
        memo.merge({
            optimization: {
                minimize: true,
                splitChunks: {
                    chunks: 'async',
                    minSize: 100000,
                    minChunks: 1,
                    automaticNameDelimiter: '.',
                    cacheGroups: {
                        vendors: {
                            name: 'vendors',
                            chunks: 'all',
                            test: /[\\/]node_modules[\\/](react(?!-ace)|lodash|moment|big3-web3|[@]?web3|[@]?ethers|[@]?apollo|[@]?graphql|styled-components|wired-styled-px2vw|big3-styled-base)/,
                            priority: 12,
                        },
                        antdesigns: {
                            name: 'antdesigns',
                            chunks: 'all',
                            test: /[\\/]node_modules[\\/](@antv|antd|@ant-design)/,
                            priority: 10,
                        },
                        // 'async-ace': {
                        //     name: 'ace',
                        //     chunks: 'async',
                        //     test: /[\\/]node_modules[\\/](ace|react-ace)/,
                        //     priority: 2,
                        // },
                        commons: {
                            name: 'commons',
                            chunks: 'all',
                            minChunks: 2,
                            priority: 1,
                            // refer: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/257#issuecomment-432594711
                            enforce: true,
                        },
                    },
                },
            },
        });

        memo.plugin(ZipPlugin.name).use(
            new ZipPlugin({
                // OPTIONAL: defaults to the Webpack output path (above)
                // can be relative (to Webpack output path) or absolute
                path: '../',
                // initialFile: 'dist',

                // OPTIONAL: defaults to the Webpack output filename (above) or,
                // if not present, the basename of the path
                filename: 'dist.zip',
            }),
        );
    },
    favicon: '/favicon.svg',
});

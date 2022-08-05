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
    headScripts: [
        'https://unpkg.com/react@17/umd/react.production.min.js',
        'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js',
    ],
    externals: {
        react: 'window.React',
        'react-dom': 'window.ReactDOM',
        lodash: 'window._',
    },
    hash: true,
    chainWebpack(memo) {
        withChainWebpack(memo, [
            { designDraft: [0, 800], rule: 'mobile', regex: /mobile\.less$/ },
            { designDraft: 801, rule: 'desktop', regex: /index\.less$/ },
        ]);

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

import './loadEnv';
import { defineConfig } from 'umi';
import { withChainWebpack } from 'big3-adaptive-media-loader';

export default defineConfig({
    define: {
        // 'process.env.MOCK_TOKEN': process.env.MOCK_TOKEN, // .env.development
        'process.env.HASURA_API': '/api/hasura-cache/v1/graphql',
        'process.env.HASURA_ADMIN_SECRET': '',
        'process.env.RPC_NODE_1': '',
        'process.env.RPC_NODE_2': '',
        'process.env.RPC_NODE_3': '',
        'process.env.CHAIN_ENV': 'dev',
        'process.env.EKS': '',
    },
    fastRefresh: {},
    proxy: {
        '/api/hasura-cache/v1/graphql': {
            target: 'https://api.wired.network',
            changeOrigin: true,
            secure: false,
        },
        '/api/ugc-gateway': {
            target: 'https://api.wired.network',
            changeOrigin: true,
            secure: false,
        },
    },
    chainWebpack(memo) {
        withChainWebpack(memo, [
            { designDraft: [0, 800], rule: 'mobile', regex: /mobile\.less$/ },
            { designDraft: 801, rule: 'desktop', regex: /index\.less$/ },
        ]);
    },
    favicon: `/favicon.svg`,
});

import { defineConfig } from 'umi';
import routes from './routes';
import pxToViewPort from 'postcss-px-to-viewport';

const PROJECT = 'Big3';
const MOBILE_DESIGN_DRAFT_WIDTH = 375;

export default defineConfig({
    define: {
        'process.env.PROJECT': PROJECT,
        'process.env.MOBILE_DESIGN_DRAFT_WIDTH': MOBILE_DESIGN_DRAFT_WIDTH,
    },
    title: 'Wired Network-Make Web3 Social+',
    plugins: [require.resolve('big3-web3-umi-plugin')],
    nodeModulesTransform: {
        type: 'none',
    },
    dynamicImport: {
        loading: '@/components/Loading',
    },
    routes,
    // So stupid feature!!!! Func u....
    // mfsu: {
    //     development: {
    //         output: '.mfsu-development',
    //     },
    // },
    fastRefresh: {},
    metas: [
        // refresh after 60s
        { httpEquiv: 'refresh', content: '600' },
    ],
    locale: {
        default: 'en-US',
        antd: false,
        title: false,
        baseNavigator: true,
        baseSeparator: '-',
    },
    links: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        {
            href: 'https://fonts.googleapis.com/css2?family=Bitter:wght@300;400;500;600;700;800;900&display=swap',
            rel: 'stylesheet',
        },
        {
            href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700;800;900&display=swap',
            rel: 'stylesheet',
        },
    ],
    extraPostCSSPlugins: [
        pxToViewPort({
            viewportWidth: MOBILE_DESIGN_DRAFT_WIDTH,
            viewportUnit: 'vw',
            mediaQuery: true,
            exclude: /(?<!mobile).less$/i,
        }),
    ],
});

import { defineConfig } from 'umi';
import routes from './routes';
import pxToViewPort from 'postcss-px-to-viewport';

const PROJECT = 'Big3';
const MOBILE_DESIGN_DRAFT_WIDTH = 375;
const PRIMARY_COLOR = '#503e9d';

export default defineConfig({
    title: 'Welcome to use!',
    theme: { '@primary-color': PRIMARY_COLOR },
    plugins: [require.resolve('big3-web3-umi-plugin')],
    nodeModulesTransform: { type: 'none' },
    dynamicImport: { loading: '@/components/Loading' },
    metas: [{ httpEquiv: 'refresh', content: '600' }],
    ignoreMomentLocale: true,
    routes,
    fastRefresh: {},
    define: {
        'process.env.PROJECT': PROJECT,
        'process.env.MOBILE_DESIGN_DRAFT_WIDTH': MOBILE_DESIGN_DRAFT_WIDTH,
    },
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

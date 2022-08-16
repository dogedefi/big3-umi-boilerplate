import './assets/styles/global.index.less';
import './assets/styles/global.mobile.less';

import './utils/scrollbar';

import 'react';
import enUS from 'antd/lib/locale/en_US';
import { setLocale } from 'umi';
import { ConfigProvider } from 'antd';
import { RefreshContextProvider } from '@/contexts/RefreshContext';
import { HelmetProvider } from 'react-helmet-async';
import { StyleSheetManager } from 'wired-styled-px2vw';

setLocale('en-US', false);

export function rootContainer(container: any) {
    return (
        <StyleSheetManager disableCSSOMInjection>
            <ConfigProvider locale={enUS}>
                <HelmetProvider>
                    <RefreshContextProvider>{container}</RefreshContextProvider>
                </HelmetProvider>
            </ConfigProvider>
        </StyleSheetManager>
    );
}

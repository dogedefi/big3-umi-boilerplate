import './assets/styles/global.index.less';
import './assets/styles/global.mobile.less';

import './utils/scrollbar';

import 'react';
import enUS from 'antd/lib/locale/en_US';
import { setLocale } from 'umi';
import { ConfigProvider } from 'antd';
import { RefreshContextProvider } from '@/contexts/RefreshContext';
import { HelmetProvider } from 'react-helmet-async';
import { getLibrary, Web3ReactProvider } from 'big3-web3';

setLocale('en-US', false);

export function rootContainer(container: any) {
    return (
        <ConfigProvider locale={enUS}>
            <Web3ReactProvider getLibrary={getLibrary}>
                <HelmetProvider>
                    <RefreshContextProvider>{container}</RefreshContextProvider>
                </HelmetProvider>
            </Web3ReactProvider>
        </ConfigProvider>
    );
}

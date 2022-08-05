import './index.less';
import './mobile.less';

import { ThemeProvider } from 'wired-styled-px2vw';
import { IRouteComponentProps, useModel } from 'umi';
import Header from './Header';
import Footer from './Footer';
import { useMemo } from 'react';
import { Big3PortalNode, Big3Layout } from 'big3-styled-base';

export default function Layout({ children }: IRouteComponentProps) {
    const { isMobile } = useModel('app');

    const wrappedTheme = useMemo(() => ({ isMobile }), [isMobile]);

    return (
        <ThemeProvider theme={wrappedTheme}>
            <Big3Layout id="content">
                <Big3PortalNode id="layer-1" position="relative" zIndex={10}>
                    <Header />
                </Big3PortalNode>
                <Big3PortalNode id="layer-2" position="relative" zIndex={20} />
                {children}
                <Footer />
            </Big3Layout>
        </ThemeProvider>
    );
}

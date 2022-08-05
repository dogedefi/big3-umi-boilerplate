import { useMemo } from 'react';
import { useModel } from 'umi';

const useStyle = (desktopCss: NodeModule, mobileCss: NodeModule) => {
    const { isMobile } = useModel('app');

    const styles = useMemo(() => (isMobile ? mobileCss : desktopCss), [isMobile]);

    return styles;
};

export default useStyle;

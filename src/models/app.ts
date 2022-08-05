import { useState, useEffect, useRef, useMemo } from 'react';
import { throttle } from 'lodash';
import { checkIfMobile } from 'wired-styled-px2vw';

const useAppModel = () => {
    const [isMobile, setIsMobile] = useState(checkIfMobile());
    const prevState = useRef(checkIfMobile());

    // IOS
    const isIOS = useMemo(() => /ipad|ipod|iphone/i.test(navigator.platform), []);

    useEffect(() => {
        const getWindowScreen = throttle(() => setIsMobile(checkIfMobile()), 100);
        window.addEventListener('resize', getWindowScreen, false);
        return () => {
            window.removeEventListener('resize', getWindowScreen, false);
        };
    }, []);

    useEffect(() => {
        if (prevState.current !== isMobile) {
            window.location.reload();
        }
    }, [isMobile]);

    return { isMobile, isIOS };
};

export default useAppModel;

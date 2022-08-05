import { useState } from 'react';

const useWalletModel = () => {
    const [readyState, setReadyState] = useState(false); // represent provider has prepared
    const [account, setAccount] = useState(null); // represent provider has prepared
    const [connected, setConnected] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [signed, setSigned] = useState(false);
    const [signing, setSigning] = useState(false);

    return {
        connected,
        setConnected,
        connecting,
        setConnecting,
        signed,
        setSigned,
        signing,
        setSigning,
        readyState,
        setReadyState,
        account,
        setAccount,
    };
};

export default useWalletModel;

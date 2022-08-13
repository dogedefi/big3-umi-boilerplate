import './index.less';
import './mobile.less';

// import { ethers } from 'ethers';
import { useWeb3React, useWallet, useWeb3Provider, Config } from 'big3-web3';
import { useModel } from 'umi';
import { AntButton, AntModal } from '@/components';
import { FC, useCallback, useEffect } from 'react';
import { eventBus } from '@/utils/eventBus';
import { EventBus, LocalStorage, RCP_NODE } from '@/config/constant';
import { Big3Box, Big3FlexBox, Big3Icon } from 'big3-styled-base';
import { ModalProps } from 'antd';
import { Big3Text } from 'big3-styled-base';
import { Big3Props } from 'big3-styled-base/dist/interface';

let _handling = false;

const WalletModal: FC<Big3Props<HTMLDivElement> & ModalProps> = (props) => {
    const { visible, onCancel } = props;
    const { account } = useWeb3React();
    const { chain, accountsChanged, chainChanged, allNotConnected, accountDisconnected, accountConnected } =
        useModel('@@chain');
    const { readyState } = useWeb3Provider();
    const { connect, connectors } = useWallet(chain);
    const { provider } = useWeb3Provider(RCP_NODE);
    const { setConnecting, setConnected, setSigning, setSigned, connected, setAccount } = useModel('wallet');

    const handleLogin = useCallback(async () => {
        if (!readyState || _handling || chainChanged) return;
        try {
            _handling = true;
            setSigning(true);
            // TODO
            // const value = {
            //     address: account,
            //     nonce: Buffer.from(ethers.utils.randomBytes(16)).toString('base64'),
            //     timestamp: Math.floor(Date.now() / 1000),
            // };
            // const rawSignature = await provider.getSigner().signMessage(String(value.timestamp));

            // const { result } = await login(account, 'wired-ugc', rawSignature, value.timestamp);

            // if (result?.token) {
            //     localStorage.setItem(LocalStorage.WALLET, account);
            //     localStorage.setItem(LocalStorage.TOKEN, result?.token);
            //     setSigned(true);
            //     setTimeout(() => window.location.reload(), 200);
            // }
        } catch (error) {
            console.error(error);
        } finally {
            _handling = false;
            setSigning(false);
        }
    }, [readyState, account, provider, chainChanged]);

    const handleConnect = (config: Config) => {
        onCancel(null);

        if (connected) {
            handleLogin();
        } else {
            connect(config);
            setConnecting(true);
        }
    };

    useEffect(() => {
        // add to event bus
        eventBus.$on(EventBus.UNAUTHORIZED, handleLogin);

        if (chainChanged) {
            window.location.reload();
            return;
        }

        if (allNotConnected || accountDisconnected) {
            localStorage.removeItem(LocalStorage.TOKEN);
            window.location.reload();
            return;
        }

        // disconnect perhaps
        if (!account) {
            setSigned(false);
            return;
        } else {
            setAccount(account);
        }

        const changedWalletOffline =
            localStorage.getItem(LocalStorage.WALLET) && localStorage.getItem(LocalStorage.WALLET) !== account;
        if (accountsChanged || accountConnected || changedWalletOffline) {
            localStorage.removeItem(LocalStorage.TOKEN);
            setConnected(true);
            setSigned(false);
            handleLogin();
            return;
        }

        // has authed
        if (localStorage.getItem(LocalStorage.TOKEN)) {
            setSigned(true);
        } else {
            setConnected(true);
            handleLogin();
        }

        return () => eventBus.$off(EventBus.UNAUTHORIZED);
    }, [handleLogin, chainChanged, allNotConnected, accountDisconnected, accountConnected, accountsChanged, account]);

    return (
        <AntModal footer={null} title="Sign in your crypto wallet" visible={visible} onCancel={onCancel} width={448}>
            <Big3Box marginTop={20} className="wallet-list">
                <Big3FlexBox column align="center">
                    {connectors
                        .filter(({ title }) => title === 'Metamask')
                        .map((walletConfig) => {
                            // WalletCard
                            const { title } = walletConfig;

                            return (
                                <AntButton
                                    key={title}
                                    onClick={() => handleConnect(walletConfig)}
                                    width="100%"
                                    height={60}
                                >
                                    <Big3FlexBox align="center" width="100%">
                                        <Big3FlexBox width={28}>
                                            <Big3Icon />
                                        </Big3FlexBox>
                                        <Big3Text
                                            marginLeft={10}
                                            fontSize={16}
                                            fontWeight={500}
                                            color="var(--black-color)"
                                        >
                                            {title}
                                        </Big3Text>
                                    </Big3FlexBox>
                                </AntButton>
                            );
                        })}
                </Big3FlexBox>
            </Big3Box>
        </AntModal>
    );
};

export default WalletModal;

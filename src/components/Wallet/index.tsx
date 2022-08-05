import './index.less';
import './mobile.less';

import { FC, useEffect, useState } from 'react';
import WalletModal from './WalletList';
import { AntButton } from '..';
import { useModel } from 'umi';
import { Big3FlexBox, Big3Image, Big3Text } from 'big3-styled-base';
import { Big3Props } from 'big3-styled-base/dist/interface';
import { eventBus } from '@/utils/eventBus';
import { EventBus } from '@/config/constant';

export const connectedKey = 'connected';

const Wallet: FC<Big3Props<HTMLDivElement>> = (props) => {
    const { matched } = useModel('@@chain');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        eventBus.$on(EventBus.UNCONNECTED, () => setVisible(true));
        return () => eventBus.$off(EventBus.UNCONNECTED);
    }, []);

    return (
        <Big3FlexBox {...(props as any)}>
            <WalletModal visible={visible} onCancel={() => setVisible(false)} />
            {!matched && (
                <AntButton disabled width={168} height={38} fontSize={16} background="rgba(249, 204, 207, 0.44)">
                    <Big3Image src="./assets/network-error.svg" width={25} marginRight={8} />
                    <Big3Text color="var(--danger-color)" fontSize={15} fontWeight={700}>
                        Wrong Network
                    </Big3Text>
                </AntButton>
            )}
            {matched && (
                <AntButton
                    onClick={() => setVisible(true)}
                    width={168}
                    height={38}
                    fontSize={16}
                    fontWeight={400}
                    color="var(--primary-color)"
                >
                    Connect Wallet
                </AntButton>
            )}
        </Big3FlexBox>
    );
};

Wallet.displayName = Wallet.name;

export default Wallet;

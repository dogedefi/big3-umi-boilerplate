import './index.less';
import './mobile.less';

import { Big3Header, Big3Text } from 'big3-styled-base';
import Wallet from '@/components/Wallet';

export default () => {
    return (
        <Big3Header>
            <Wallet />
            <Big3Text>Header</Big3Text>
        </Big3Header>
    );
};

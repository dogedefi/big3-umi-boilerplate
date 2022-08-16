import desktop from './index.less';
import mobile from './mobile.less';
import useStyle from '@/hooks/useStyle';

import { Big3Header, Big3Text } from 'big3-styled-base';

export default () => {
    const styles = useStyle(desktop, mobile);

    return (
        <Big3Header>
            <Big3Text>Header</Big3Text>
        </Big3Header>
    );
};

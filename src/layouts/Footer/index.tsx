import desktop from './index.less';
import mobile from './mobile.less';
import useStyle from '@/hooks/useStyle';

import { Big3Footer } from 'big3-styled-base';

export default () => {
    const styles = useStyle(desktop, mobile);
    
    return <Big3Footer>Footer</Big3Footer>;
};

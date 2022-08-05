import desktop from './index.less';
import mobile from './mobile.less';
import useStyle from '@/hooks/useStyle';

import { Big3Page } from 'big3-styled-base';

const Home = () => {
    const styles = useStyle(desktop, mobile);

    return <Big3Page className={styles['home']}>Home</Big3Page>;
};

export default Home;

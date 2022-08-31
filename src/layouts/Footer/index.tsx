import './index.less';
import './mobile.less';

import { Big3FlexBox, Big3Footer, Big3Text } from 'big3-styled-base';

export default () => {
    return (
        <Big3Footer width="100%" position="fixed" zIndex={100} bottom={0} left={0} transition="all 0.2s">
            <Big3FlexBox
                padding="0 var(--both-spacing)"
                height="var(--footer-height)"
                maxWidth="var(--design-draft-width)"
                margin="0 auto"
            >
                <Big3Text>Footer</Big3Text>
            </Big3FlexBox>
        </Big3Footer>
    );
};

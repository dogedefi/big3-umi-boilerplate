import './index.less';
import './mobile.less';

import { Big3FlexBox, Big3Header, Big3Text } from 'big3-styled-base';

export default () => {
    return (
        <Big3Header width="100%" position="fixed" zIndex={100} top={0} left={0} transition="all 0.2s">
            <Big3FlexBox
                padding="0 var(--both-spacing)"
                height="var(--header-height)"
                maxWidth="var(--design-draft-width)"
                margin="0 auto"
            >
                <Big3Text>Header</Big3Text>
            </Big3FlexBox>
        </Big3Header>
    );
};

import { FC } from 'react';
import { Big3FlexBox } from 'big3-styled-base';

const WiredLoading: FC = () => {
    return (
        <Big3FlexBox
            position="fixed"
            zIndex={10000}
            left="0"
            top="0"
            width="100vw"
            height="100vh"
            align="center"
            justify="center"
            background="#f0f0f0"
        >
            Loading...
        </Big3FlexBox>
    );
};

WiredLoading.displayName = WiredLoading.name;

export default WiredLoading;

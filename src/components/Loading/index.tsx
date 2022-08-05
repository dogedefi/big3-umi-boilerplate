import { FC } from 'react';
import { Big3FlexBox } from 'big3-styled-base';

const Loading: FC = () => {
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

Loading.displayName = Loading.name;

export default Loading;

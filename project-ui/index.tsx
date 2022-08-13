import { textCss, settleCss, flexCss } from 'big3-styled-base';
import styled from 'wired-styled-px2vw';
import Button, { ButtonProps } from 'antd/lib/button';
import { Big3Props, FlexCss } from 'big3-styled-base/dist/interface';

export const WiredPureButton = styled(Button).attrs({ align: 'center' })<
    ButtonProps & Big3Props<HTMLButtonElement> & FlexCss & { hoverBackground?: string }
>`
    /* upgrade weights */
    && {
        width: auto;
        border: none;
        background: transparent;
        letter-spacing: 0.02em;
        padding-left: 8px;
        padding-right: 8px;
        border-radius: var(--btn-radius);
        border: var(--primary-color) 1px solid;
        ${(props) => textCss(props)};
        ${(props) => flexCss(props)};

        > span {
            line-height: 100%;
        }

        &:hover {
            filter: brightness(${(props) => (props.background && !props.hoverBackground ? '120%' : 'none')});
            background: ${(props) => settleCss(props.hoverBackground, 'var(--primary-color)')};
            color: var(--white-color);
        }
    }
`;

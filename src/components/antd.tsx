import { Modal, ModalProps, Button, ButtonProps } from 'antd';
import { baseCss } from 'big3-styled-base';
import { Big3Props } from 'big3-styled-base/dist/interface';
import styled, { createGlobalStyle } from 'wired-styled-px2vw';

export const AntGlobalStyle = createGlobalStyle`
    /* collapse */
    .ant-collapse {
        border: none !important;
        
        .ant-collapse-item,
        .ant-collapse-content {
            border: none !important;
        }

        .ant-collapse-header {
            display: none !important;
        }
    }

    /* modal */
    .ant-scrolling-effect {
        width: 100% !important;
    }

    /* spin */
    .ant-spin-nested-loading,
    .ant-spin-container {
        height: 100%;
        width: 100%;
    }

    /* popover */
    .ant-popover {
        background: transparent;
        padding: 0;

        &.pure {
            .ant-popover-inner {
                background-color: transparent;
                background-clip: padding-box;
                border-radius: 2px;
                box-shadow: none;
            }
        }
    }
    .ant-popover-arrow {
        display: none;
    }
    .ant-popover-inner-content {
        padding: 0;
    }

    /* select */
    .ant-select-dropdown {
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        background: var(--white-color);
        width: auto !important;
        padding: 4px;

        .ant-select-item {
            min-width: 158px;
            height: 40px;
        }

        .ant-select-item-option-selected,
        .ant-select-item-option-active {
            color: var(--primary-color);
            background: #f9f7ff;
        }
        .ant-select-item-option-content {
            font-size: 15px;
            font-weight: 400;
            color: var(--gray-color);
            display: flex;
            align-items: center;
        }
        .ant-select-item-option-selected,
        .ant-select-item-option-active {
            .ant-select-item-option-content {
                color: var(--primary-color);
                font-weight: 600;
                font-size: 16px;
            }
        }
    }
`;

export const AntModal = styled(Modal)<Big3Props<HTMLDivElement> & ModalProps>``;
export const AntButton = styled(Button)<Big3Props<HTMLButtonElement> & ButtonProps>`
    ${(props) => baseCss(props)};
`;

import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-patched';

const getScrollWidth = () => {
    const scrollDiv = document.getElementById('scrollDiv')
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    return scrollbarWidth || 17
}

export default class _Scrollbars extends React.Component {
    render() {
        const { children, ...restProps } = this.props;
        const browserScrollbarWidth = getScrollWidth();

        return (
            <Scrollbars
                browserScrollbarWidth={browserScrollbarWidth}
                {...restProps}
            >
                {children}
            </Scrollbars>
        );
    }
}

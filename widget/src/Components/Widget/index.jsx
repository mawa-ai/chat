import React from 'react';
import { getWidgetStyle, getWidgetClassNames } from '../../Contexts/Widget';

import './style.scss';

export default props => {
    return (
        <div
            className={`chat-widget ${getWidgetClassNames()} ${props.show ? '' : 'hide'}`}
            style={getWidgetStyle()} onClick={props.onClick}>
        </div>
    );
}
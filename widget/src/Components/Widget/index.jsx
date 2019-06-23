import React, { useContext } from 'react';
import { widgetContext, getWidgetStyle, getWidgetClassNames } from '../../Contexts/Widget';

import './style.scss';

export default () => {
    const widget = useContext(widgetContext);

    return (
        <div
            className={`chat-widget ${getWidgetClassNames()}`}
            style={getWidgetStyle()}>
        </div>
    );
}
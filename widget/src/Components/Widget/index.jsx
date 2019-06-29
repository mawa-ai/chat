import React, { useContext } from 'react';
import { widgetContext, getWidgetStyle, getWidgetClassNames } from '../../Contexts/Widget';

import './style.scss';

export default props => {
    const widget = useContext(widgetContext);
    const hideClass = widget.config.chatOpened ? 'hide' : '';

    const openChat = () => widget.setConfig({ chatOpened: true });;

    return (
        <div
            className={`chat-widget ${getWidgetClassNames()} ${hideClass}`}
            style={getWidgetStyle()} onClick={openChat}>
        </div>
    );
}
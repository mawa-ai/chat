import React, { useContext } from 'react';
import { widgetContext, getWidgetClassNames } from '../../Contexts/Widget';

import './style.scss';

export default props => {
    const widget = useContext(widgetContext);
    const hideClass = widget.config.chatOpened == null ? "dn" : (widget.config.chatOpened ? '' : 'hide');

    return (
        <iframe src={`http://localhost:3000/${props.botId}?frame=true`} className={`chat-frame ${hideClass} ${getWidgetClassNames()}`} />
    );
}
import React, { useContext, useEffect } from 'react';
import { widgetContext, getWidgetClassNames } from '../../Contexts/Widget';

import './style.scss';

export default props => {
    const widget = useContext(widgetContext);
    const hideClass = widget.config.chatOpened == null ? "dn" : (widget.config.chatOpened ? '' : 'hide');

    useEffect(() => {
        const closeChatListener = ev => {
            if (ev.data.type === "close-chat") {
                if (widget.config.chatOpened) {
                    widget.setConfig({ chatOpened: false });
                }
            }
        };

        window.addEventListener('message', closeChatListener);
        return () => window.removeEventListener('message', closeChatListener);
    });

    return (
        <iframe src={`http://localhost:3000/${props.botId}?frame=true`}
            className={`chat-frame ${hideClass} ${getWidgetClassNames()}`} />
    );
}
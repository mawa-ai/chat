import React, { useContext, useState, useEffect } from 'react';
import { widgetContext, getWidgetStyle, getWidgetClassNames } from '../../Contexts/Widget';

import './style.scss';

export default props => {
    const [chatMessages, setChatMessages] = useState(0);

    const widget = useContext(widgetContext);
    const hideClass = widget.config.chatOpened ? 'hide' : '';

    const openChat = () => widget.setConfig({ chatOpened: true });;

    useEffect(() => {
        setChatMessages(0);
    }, [widget.config.chatOpened]);

    useEffect(() => {
        const chatMessageListener = ev => {
            if (ev.data.type === "chat-message") {
                setChatMessages(p => p + 1);
            }
        };

        window.addEventListener('message', chatMessageListener);
        return () => window.removeEventListener('message', chatMessageListener);
    });

    return (
        <div
            className={`chat-widget ${getWidgetClassNames()} ${hideClass}`}
            style={getWidgetStyle()} onClick={openChat}>

            {chatMessages > 0 && widget.config.notification && (
                <div className="chat-widget-notification" style={{
                    backgroundColor: widget.config.notificationBackgroundColor,
                    color: widget.config.notificationColor
                }}>{chatMessages}</div>
            )}
        </div>
    );
}
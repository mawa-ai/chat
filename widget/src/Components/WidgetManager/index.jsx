import React, { useState, useEffect } from 'react';
import Widget from '../Widget';
import { widgetContext } from '../../Contexts/Widget';
import Chat from '../Chat';
import useWebSocket from 'react-use-websocket';
import MessageContext from '../../Contexts/Message';

export default (props) => {
    const [widgetConfiguration, setWidgetConfiguration] = useState();
    const [message, setMessage] = useState();

    const [sendMessage, lastMessage] = useWebSocket(getWebsocketUrl(props));

    useEffect(() => {
        if (lastMessage) {
            setMessage(JSON.parse(lastMessage.data))
        }
    }, [lastMessage]);

    useEffect(() => {
        if (message && message.type === 'widget-configuration') {
            setWidgetConfiguration(message.data);
        }
    }, [message]);

    const setConfig = newConfig => setWidgetConfiguration(p => ({ ...p, ...newConfig }));

    return (
        widgetConfiguration ? (
            <MessageContext.Provider value={{ sendMessage, message }}>
                <widgetContext.Provider value={{ config: widgetConfiguration, setConfig }}>
                    <Widget />
                    <Chat botId={props.botId} />
                </widgetContext.Provider>
            </MessageContext.Provider>
        ) : false
    );
}

const getWebsocketUrl = props => {
    const queryParameters = Object.keys(props).filter(k => props[k])
        .map(k => `${k}=${props[k]}`).join('&');

    return `ws://localhost:8080?${queryParameters}&source=widget`;
};
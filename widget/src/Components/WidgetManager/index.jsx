import React, { useState, useEffect, useContext } from 'react';
import Widget from '../Widget';
import { widgetContext } from '../../Contexts/Widget';
import { addCommandListener, removeCommandListener, sendCommand } from '../../Services/commandService';
import Chat from '../Chat';

let ws;

const connectWithServer = (url, callback) => {
    if (!ws || ws.readyState === ws.CLOSED) {
        ws = new WebSocket(url, 'echo-protocol');
        ws.addEventListener('open', () => callback(true));
        ws.addEventListener('close', () => callback(false) &&
            setTimeout(() => connectWithServer(callback), 1000));
        ws.addEventListener('error', () => setTimeout(() => connectWithServer(callback), 1000));
    }
};

export default (props) => {
    const [widgetConfiguration, setWidgetConfiguration] = useState();
    const [isChatOpened, setIsChatOpened] = useState(false);

    useEffect(() => widgetConfiguration && setIsChatOpened(widgetConfiguration.startOpened), [widgetConfiguration])

    useEffect(() => {
        addCommandListener('widget-configuration', setWidgetConfiguration)
        return () => removeCommandListener('widget-configuration');
    });

    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        ws.addEventListener('message', ev => sendCommand(JSON.parse(ev.data)));
    }, [isConnected]);

    const queryParameters = Object.keys(props).filter(k => props[k])
        .map(k => `${k}=${props[k]}`).join('&');

    connectWithServer(`ws://localhost:8080?${queryParameters}`, setIsConnected);

    const toggleChat = () => setIsChatOpened(p => !p);

    return (
        widgetConfiguration && (
            <widgetContext.Provider value={widgetConfiguration}>
                <Widget onClick={toggleChat} show={isConnected && !isChatOpened} />
                <Chat botId={props.botId} show={isConnected && isChatOpened} />
            </widgetContext.Provider>
        ) || false
    );
}
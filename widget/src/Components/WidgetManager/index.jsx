import React, { useState, useEffect, useContext } from 'react';
import Widget from '../Widget';
import { widgetContext } from '../../Contexts/Widget';
import { addCommandListener, removeCommandListener, sendCommand } from '../../Services/commandService';
import Chat from '../Chat';
import { websocketContext } from '../../Contexts/Websocket';

export default (props) => {
    const queryParameters = Object.keys(props).filter(k => props[k])
        .map(k => `${k}=${props[k]}`).join('&');

    const websocket =
        useContext(websocketContext(`ws://localhost:8080?${queryParameters}`, 'echo-protocol'));

    useEffect(() => websocket.lastMessage && sendCommand(JSON.parse(websocket.lastMessage.data)),
        [websocket.lastMessage]);

    const [widgetConfiguration, setWidgetConfiguration] = useState();

    useEffect(() => {
        addCommandListener('widget-configuration', setWidgetConfiguration)
        return () => removeCommandListener('widget-configuration');
    });

    const [isChatOpened, setIsChatOpened] = useState(null);
    useEffect(() => {
        if (widgetConfiguration && widgetConfiguration.startOpened) {
            setIsChatOpened(true);
        }
    }, [widgetConfiguration]);

    const toggleChatOpened = () => setIsChatOpened(p => !p);

    return (
        widgetConfiguration && (
            <widgetContext.Provider value={websocket}>
                <widgetContext.Provider value={widgetConfiguration}>
                    <Widget onClick={toggleChatOpened} show={!isChatOpened} />
                    <Chat botId={props.botId} show={isChatOpened} />
                </widgetContext.Provider>
            </widgetContext.Provider>
        ) || false
    );
}
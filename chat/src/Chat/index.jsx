import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import ChatContent from '../Components/ChatContent';
import ChatInput from '../Components/ChatInput';
import { getUrlParameters } from '../Services/urlService';
import useWebSocket from 'react-use-websocket';
import MessageContext from '../Contexts/Message';

import '../Stylesheets/normalize.scss';
import '../Stylesheets/global.scss';
import './style.scss';
import Theme from '../Contexts/Theme';

export default () => {
    const [theme, setTheme] = useState();
    const [message, setMessage] = useState();
    const [sendMessage, setSendMessage] = useState(() => null);

    const { parameters } = getUrlParameters("/:botId", ["frame"]);

    const [sendSocketMessage, lastMessage, readyState] = useWebSocket(getWebsocketUrl(parameters.botId));

    useEffect(() => {
        if (readyState === 1) {
            setSendMessage(message => sendSocketMessage(JSON.stringify(message)));

            if (lastMessage) {
                setMessage(JSON.parse(lastMessage.data));
            }
        }
    }, [lastMessage, sendSocketMessage, readyState]);

    useEffect(() => {
        if (message && message.type === 'chat-theme') {
            setTheme(message.data);
        }
    }, [message]);

    return (
        theme ? (
            <MessageContext.Provider value={{ sendMessage, message }}>
                <Theme.Provider value={theme}>
                    <div className="chat-container">
                        <Navbar isFrame={!!parameters.frame} />
                        <ChatContent />
                        <ChatInput />
                    </div>
                </Theme.Provider>
            </MessageContext.Provider>
        ) : false
    );
}

const getWebsocketUrl = botId => {
    return `ws://localhost:8080?botId=${botId}&source=chat`;
};
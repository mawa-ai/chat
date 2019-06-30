import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import ChatContent from '../Components/ChatContent';
import ChatInput from '../Components/ChatInput';
import { getUrlParameters } from '../Services/urlService';
import useWebSocket from 'react-use-websocket';
import MessageContext from '../Contexts/Message';
import BotContext from '../Contexts/Bot';
import ThemeContext from '../Contexts/Theme';

import '../Stylesheets/normalize.scss';
import '../Stylesheets/global.scss';
import './style.scss';

export default () => {
    const [theme, setTheme] = useState();
    const [botSettings, setBotSettings] = useState()
    const [message, setMessage] = useState();
    const [sendMessage, setSendMessage] = useState(() => null);

    const { parameters } = getUrlParameters("/:botId", ["frame"]);

    const [sendSocketMessage, lastMessage, readyState] = useWebSocket(getWebsocketUrl(parameters.botId));

    useEffect(() => {
        if (readyState === 1) {
            setSendMessage(() => message => sendSocketMessage(JSON.stringify(message)));

            if (lastMessage) {
                setMessage(JSON.parse(lastMessage.data));
            }
        }
    }, [lastMessage, sendSocketMessage, readyState]);

    useEffect(() => {
        if (message && message.type) {
            switch (message.type) {
                case "chat-theme":
                    setTheme(message.data);
                    break;
                case "bot-settings":
                    setBotSettings(message.data);
                    break;
                default:
                    break;
            }
        }
    }, [message]);

    return (
        theme && botSettings ? (
            <MessageContext.Provider value={{ sendMessage, message }}>
                <BotContext.Provider value={botSettings}>
                    <ThemeContext.Provider value={theme}>
                        <div className="chat-container">
                            <Navbar isFrame={!!parameters.frame} />
                            <ChatContent isFrame={!!parameters.frame} />
                            <ChatInput />
                        </div>
                    </ThemeContext.Provider>
                </BotContext.Provider>
            </MessageContext.Provider>
        ) : false
    );
}

const getWebsocketUrl = botId => {
    return `ws://localhost:8080?botId=${botId}&source=chat`;
};
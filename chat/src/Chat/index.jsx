import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import ChatContent from '../Components/ChatContent';
import ChatInput from '../Components/ChatInput';
import { getUrlParameters } from '../Services/urlService';
import useWebSocket from 'react-use-websocket';
import MessageContext from '../Contexts/Message';
import BotContext from '../Contexts/Bot';
import ThemeContext from '../Contexts/Theme';
import { UserContextProvider } from '../Contexts/User';

import '../Stylesheets/normalize.scss';
import '../Stylesheets/global.scss';
import './style.scss';

export default () => {
    const [theme, setTheme] = useState();
    const [botSettings, setBotSettings] = useState()
    const [message, setMessage] = useState();
    const [sendMessage, setSendMessage] = useState(() => null);
    const [user, setUser] = useState();

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
        if (message && message.to === "chat" && message.type === "application/json") {
            switch (message.content.type) {
                case "theme":
                    setTheme(message.content.data);
                    break;
                case "bot-settings":
                    setBotSettings(message.content.data);
                    break;
                case "user":
                    setUser(message.content.data);
                    break;
                default:
                    break;
            }
        }
    }, [message]);

    return (
        theme && botSettings && user ? (
            <MessageContext.Provider value={{ sendMessage, message }}>
                <BotContext.Provider value={botSettings}>
                    <ThemeContext.Provider value={theme}>
                        <UserContextProvider value={user}>
                            <div className="chat-container">
                                <Navbar isFrame={!!parameters.frame} />
                                <ChatContent isFrame={!!parameters.frame} />
                                <ChatInput />
                            </div>
                        </UserContextProvider>
                    </ThemeContext.Provider>
                </BotContext.Provider>
            </MessageContext.Provider>
        ) : false
    );
}

const getWebsocketUrl = botId => {
    return `ws://localhost:8080?botId=${botId}&source=chat`;
};
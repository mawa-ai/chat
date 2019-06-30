import React, { useState, useContext, useEffect, useRef } from 'react';
import ThemeContext from '../../Contexts/Theme';
import MessageContext from '../../Contexts/Message';
import { getChatComponent } from '../ChatComponents';

import './style.scss';

const scrollTo = (element, to, duration) => {
    if (duration <= 0 || element.scrollTop === to)
        return;

    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(() => {
        element.scrollTop = element.scrollTop + perTick;
        scrollTo(element, to, duration - 10);
    }, 10);
}

export default props => {
    const chatRef = useRef();

    const [thread, setThread] = useState([]);

    const theme = useContext(ThemeContext);
    const { message } = useContext(MessageContext);

    useEffect(() => {
        if (message) {
            const component = getChatComponent(message);

            if (component) {
                setThread(p => [...p, component]);
                scrollTo(chatRef.current, chatRef.current.scrollHeight, 300);

                if (props.isFrame) {
                    window.parent.postMessage({ type: "chat-message" }, "*");
                }
            }
        }
    }, [message, props.isFrame]);

    return (
        <div className="chat-content" style={{ backgroundColor: theme.secondaryColor }} ref={chatRef}>
            {
                thread
            }
        </div>
    );
}
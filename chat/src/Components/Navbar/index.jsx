import React, { useContext, useState, useEffect } from 'react';
import Theme from '../../Contexts/Theme';
import Bot from '../../Contexts/Bot';

import './style.scss';

export default () => {
    const theme = useContext(Theme);
    const bot = useContext(Bot);

    const [windowWidthSize, setWindowWidthSize] = useState(window.innerWidth);
    useEffect(() => {
        const onResize = () => {
            setWindowWidthSize(window.innerWidth);
        };

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, [windowWidthSize])

    return (
        <div className="chat-navbar" style={{ backgroundColor: theme.primaryColor }}>
            {
                windowWidthSize < 440 ? (
                    <>
                        <img className="bot-image" src={bot.image} alt="Chatbot" />
                        <div className="bot-details">
                            <span className="bot-name">{bot.name}</span>
                            <span className="bot-status">{bot.status}</span>
                        </div>
                    </>
                ) : (
                        <>
                            <span className="bot-talk">
                                Fale com {bot.name}
                            </span>
                        </>
                    )
            }

        </div>
    );
}
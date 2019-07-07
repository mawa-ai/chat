import React, { useState, useContext, useEffect } from 'react';
import Color from 'color';
import ThemeContext from '../../Contexts/Theme';
import MessageContext from '../../Contexts/Message';
import BotContext from '../../Contexts/Bot';
import { UserContext } from '../../Contexts/User';

import './style.scss';

export default () => {
    const theme = useContext(ThemeContext);
    const { sendMessage } = useContext(MessageContext);
    const bot = useContext(BotContext);
    const { user } = useContext(UserContext);

    const [themeButtonStyle, setThemeButtonStyle] = useState({});
    const [input, setInput] = useState('');
    const [isHoveringSendButton, setIsHoveringSendButton] = useState(false);

    useEffect(() => {
        setThemeButtonStyle({
            backgroundColor: Color(theme.primaryColor).lighten(isHoveringSendButton ? 0.05 : 0)
        });
    }, [isHoveringSendButton, theme.primaryColor]);

    const sendInput = () => {
        if (input.trim()) {
            sendMessage({
                from: user.id,
                to: bot.id,
                type: "text/plain",
                content: input.trim()
            });
            setInput('');
        }
    };

    return (
        <div className="chat-input">
            <input placeholder="Digite aqui..." className="flat-input" type="text" value={input}
                onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendInput()} />
            <button className={`flat-btn  ${input.trim() || 'dn'}`} style={themeButtonStyle}
                onMouseEnter={() => setIsHoveringSendButton(true)} onMouseLeave={() => setIsHoveringSendButton(false)}
                onClick={sendInput}>
                Enviar
            </button>
        </div>
    );
}
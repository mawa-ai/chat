import React, { useState, useContext, useEffect } from 'react';
import Color from 'color';
import ThemeContext from '../../Contexts/Theme';
import MessageContext from '../../Contexts/Message';

import './style.scss';

export default () => {
    const theme = useContext(ThemeContext);
    const { sendMessage } = useContext(MessageContext);

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
                type: "user-input",
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
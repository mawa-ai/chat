import React, { useState, useContext, useEffect } from 'react';
import Color from 'color';
import Theme from '../../Contexts/Theme';

import './style.scss';

export default () => {
    const theme = useContext(Theme);

    const [themeButtonStyle, setThemeButtonStyle] = useState({});
    const [input, setInput] = useState('');
    const [isHoveringSendButton, setIsHoveringSendButton] = useState(false);

    useEffect(() => {
        setThemeButtonStyle({
            backgroundColor: Color(theme.primaryColor).lighten(isHoveringSendButton ? 0.05 : 0)
        });
    }, [isHoveringSendButton, theme.primaryColor]);

    return (
        <div className="chat-input">
            <input placeholder="Digite aqui..." className="flat-input" type="text"
                onChange={e => setInput(e.target.value)} value={input} />
            <button className={`flat-btn  ${input.length === 0 && 'dn'}`} style={themeButtonStyle}
                onMouseEnter={() => setIsHoveringSendButton(true)} onMouseLeave={() => setIsHoveringSendButton(false)}>
                Enviar
            </button>
        </div>
    );
}
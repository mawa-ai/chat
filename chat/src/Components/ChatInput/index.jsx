import React, { useState, useContext, useEffect } from 'react';
import Theme from '../../Contexts/Theme';

import './style.scss';

export default () => {
    const theme = useContext(Theme);

    const [isHoveringSendButton, setIsHoveringSendButton] = useState(false);
    const [themeButtonStyle, setThemeButtonStyle] = useState({});

    useEffect(() => {
        setThemeButtonStyle({
            backgroundColor: theme.primaryColor.lighten(isHoveringSendButton ? 0.05 : 0)
        });
    }, [isHoveringSendButton, theme.primaryColor]);

    return (
        <div className="chat-input">
            <input placeholder="Digite aqui..." className="flat-input" type="text" />
            <button className="flat-btn" style={themeButtonStyle}
                onMouseEnter={() => setIsHoveringSendButton(true)} onMouseLeave={() => setIsHoveringSendButton(false)}>
                Enviar
            </button>
        </div>
    );
}
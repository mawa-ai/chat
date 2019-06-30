import React, { memo, useContext } from 'react';
import ThemeContext from '../../../Contexts/Theme';

import './style.scss';

export default memo(props => {
    const side = props.metadata && props.metadata.from === 'user' ? 'right' : 'left';
    let style = {};

    if (side === 'right') {
        const theme = useContext(ThemeContext);
        style = {
            backgroundColor: theme.primaryColor,
            color: theme.secondaryColor
        };
    }

    return (
        <div className={`chat-component text ${side}`} style={style}>
            {props.content}
        </div>
    );
});
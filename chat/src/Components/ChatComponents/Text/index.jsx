import React, { memo, useContext } from 'react';
import ThemeContext from '../../../Contexts/Theme';
import { UserContext } from '../../../Contexts/User';

import './style.scss';

export default memo(props => {
    const { user } = useContext(UserContext);
    const side = props.from === user.id ? 'right' : 'left';

    let style = {};

    if (side === 'right') {
        const theme = useContext(ThemeContext);
        style = {
            backgroundColor: theme.primaryColor,
            color: theme.secondaryColor
        };
    }

    return (
        <div className={`text ${side}`} style={style}>
            {props.content}
        </div>
    );
});
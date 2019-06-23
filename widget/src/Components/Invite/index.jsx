import React, { useContext } from 'react';

import './style.scss';

export default (props) => {
    return (
        <div className="chat-widget-invite">
            {props.message}
        </div>
    );
}
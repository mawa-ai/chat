import React from 'react';

import './style.scss';

export default props => {
    switch (props.content.state) {
        case "composing":
            return (
                <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            );
        default:
            return false;
    }
};
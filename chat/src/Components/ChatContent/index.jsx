import React from 'react';

import './style.scss';
import Theme from '../../Contexts/Theme';

export default () => {
    return (
        <Theme.Consumer>
            {
                theme => (
                    <div className="chat-content" style={{ backgroundColor: theme.secondaryColor }}>

                    </div>
                )
            }
        </Theme.Consumer>
    );
}
import React from 'react';
import { getWidgetClassNames } from '../../Contexts/Widget';

import './style.scss';

export default (props) => {
    const hideClass = props.show === null ? "force-hide" : (props.show ? '' : 'hide');

    return (
        <iframe src={`http://localhost:3000/${props.botId}`} className={`chat-frame ${hideClass} ${getWidgetClassNames()}`} />
    );
}
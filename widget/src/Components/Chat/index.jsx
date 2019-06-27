import React from 'react';
import { getWidgetClassNames } from '../../Contexts/Widget';

import './style.scss';

export default (props) => {
    const { show } = props;

    return (
        <iframe src={`http://localhost:3000/${props.botId}`} className={`chat-frame ${show ? '' : 'hide'} ${getWidgetClassNames()}`} />
    );
}
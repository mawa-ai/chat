import React, { useContext } from 'react';
import { widgetContext, getWidgetStyle, getWidgetClassNames } from '../../Contexts/Widget';
import Invite from '../Invite';

import './style.scss';

export default () => {
    const widget = useContext(widgetContext);

    return (
        <>
            <div
                className={getWidgetClassNames()}
                style={getWidgetStyle()}>
            </div>
            {widget.showInvite &&
                <Invite message={widget.inviteMessage}
                    showTimeout={widget.inviteShowTimeout}
                    hideTimeout={widget.inviteHideTimeout} />}
        </>
    );
}
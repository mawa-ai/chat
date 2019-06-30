import React, { memo } from 'react';

export default memo(props => {
    return (
        <div>
            {props.content}
        </div>
    );
});
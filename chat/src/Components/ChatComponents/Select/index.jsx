import React, { memo, useContext, useState, useEffect } from 'react';
import Color from 'color';
import Text from '../Text';
import ThemeContext from '../../../Contexts/Theme';
import MessageContext from '../../../Contexts/Message';

import "./style.scss";

const SelectOption = memo(props => {
    const theme = useContext(ThemeContext);

    return (
        <div className="option" style={{
            borderColor: theme.primaryColor,
            backgroundColor: Color(theme.primaryColor).lighten(0.6)
        }} onClick={props.onClick}>
            {props.text}
        </div>
    );
});

export default memo(props => {
    const { message, sendMessage } = useContext(MessageContext);

    if (props.content.scope === "immediate") {
        const textProps = {
            ...props,
            content: props.content.text
        };

        const [isOptionSelected, setIsOptionSelected] = useState(false);
        const onSelectOption = option => {
            sendMessage({
                type: "user-input",
                content: option.text
            });
            setIsOptionSelected(true);
        };

        useEffect(() => {
            if (message.id !== props.id) {
                setIsOptionSelected(true);
            }
        }, [message, props]);

        return (
            <>
                {
                    props.content.text && <Text {...textProps} />
                }
                {
                    !isOptionSelected && (
                        <div className="select-options">
                            {
                                props.content.options.map((o, i) =>
                                    <SelectOption key={i} {...o} onClick={_ => onSelectOption(o)} />)
                            }
                        </div>
                    )
                }
            </>
        );
    }

    return false;
});
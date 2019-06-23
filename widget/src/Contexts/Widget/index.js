import { createContext, useContext } from 'react';

export const widgetContext = createContext();

export const getWidgetStyle = () => {
    const widget = useContext(widgetContext);

    const style = {
        height: widget.size,
        width: widget.size,
        borderRadius: widget.rounded,
        backgroundColor: widget.backgroundColor,
        backgroundImage: `url("${widget.innerImage}")`
    };

    return style;
}

export const getWidgetClassNames = () => {
    const widget = useContext(widgetContext);

    const classes = [widget.position];
    if (widget.animated) {
        classes.push('animated');
    }

    return classes.join(' ');
}
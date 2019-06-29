import { createContext, useContext } from 'react';

export const widgetContext = createContext({ config: {}, setConfig: () => null });

export const getWidgetStyle = () => {
    const widgetConfig = useContext(widgetContext).config;

    const style = {
        height: widgetConfig.size,
        width: widgetConfig.size,
        borderRadius: widgetConfig.rounded,
        backgroundColor: widgetConfig.backgroundColor,
        backgroundImage: `url("${widgetConfig.innerImage}")`
    };

    return style;
}

export const getWidgetClassNames = () => {
    const widgetConfig = useContext(widgetContext).config;

    const classes = [widgetConfig.position];
    if (widgetConfig.animated) {
        classes.push('animated');
    }

    return classes.join(' ');
}
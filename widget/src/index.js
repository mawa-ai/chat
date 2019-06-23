import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import WidgetManager from './Components/WidgetManager'

function getDockElement() {
    if (this.configuration.renderElement) {
        return this.configuration.renderElement;
    }

    const renderElement = document.createElement('div');
    renderElement.id = 'chat-widget-container';
    document.body.appendChild(renderElement);
    return renderElement;
}

export class ChatWidget {
    constructor(configuration) {
        this.configuration = configuration;
    }

    async start() {
        ReactDOM.render(<WidgetManager
            userId={this.configuration.userId}
            botId={this.configuration.botId}
        />, getDockElement.bind(this)());
    }
}
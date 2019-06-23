import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './Components/Widget'

export class ChatWidget {
    constructor(configuration) {
        this.configuration = configuration;
    }

    async start() {
        let renderElement = this.configuration.renderElement;
        if (!renderElement) {
            renderElement = document.createElement('div');
            renderElement.id = 'chat-widget-container';
            document.body.appendChild(renderElement);
        }

        ReactDOM.render(<Widget />, renderElement);
    }
}
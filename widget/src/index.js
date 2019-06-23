import 'regenerator-runtime/runtime';
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

export class ChatWidget {
    constructor(configuration) {
        this.configuration = configuration;
    }

    async start() {
        const Widget = lazy(() => import('./Components/Widget'));

        let renderElement = this.configuration.renderElement;
        if (!renderElement) {
            renderElement = document.createElement('div');
            renderElement.id = 'chat-widget-container';
            document.body.appendChild(renderElement);
        }

        ReactDOM.render(
            <Suspense fallback="">
                <Widget />
            </Suspense>,
            renderElement);
    }
}
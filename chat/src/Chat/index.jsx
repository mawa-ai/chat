import React from 'react';
import Navbar from '../Components/Navbar';
import ChatContent from '../Components/ChatContent';
import ChatInput from '../Components/ChatInput';

import { getUrlParameters } from '../Services/urlService';

import '../Stylesheets/normalize.scss';
import './style.scss';

export default () => {
    const parameters = getUrlParameters('/:botIdentity/:oie', ['userId']);
    console.log(parameters);

    return (
        <div className="chat-container">
            <Navbar />
            <ChatContent />
            <ChatInput />
        </div>
    );
}
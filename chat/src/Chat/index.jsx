import React from 'react';
import Navbar from '../Components/Navbar';
import ChatContent from '../Components/ChatContent';
import ChatInput from '../Components/ChatInput';

import '../Stylesheets/normalize.scss';
import '../Stylesheets/global.scss';
import './style.scss';

export default () => {
    return (
        <div className="chat-container">
            <Navbar />
            <ChatContent />
            <ChatInput />
        </div>
    );
}
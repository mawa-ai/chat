import React, { useState, useEffect } from 'react';
import Widget from '../Widget';

let ws;

const connectWithServer = (callback) => {
    if (!ws || ws.readyState === ws.CLOSED) {
        ws = new WebSocket('ws://localhost:8080', 'echo-protocol');
        ws.addEventListener('open', () => callback(true));
        ws.addEventListener('close', () => callback(false) &&
            setTimeout(() => connectWithServer(callback), 1000));
        ws.addEventListener('error', () => setTimeout(() => connectWithServer(callback), 1000));
    }    
};

export default () => {
    const [isConnected, setIsConnected] = useState(false);
    
    useEffect(() => {
        // AQUI EU ESCUTO AS MENSAGENS E CRIO O SENDER
    }, [isConnected])
    
    connectWithServer(setIsConnected);
    
    return (
        <Widget show={isConnected} />
    );
}
import { useState, useEffect, useRef, useCallback, createContext } from 'react';

export const useWebSocket = (url, protocol) => {
    const websocket = useRef(new WebSocket(url, protocol));
    
    const [lastMessage, setLastMessage] = useState();
    websocket.current.onmessage = message => setLastMessage(message);
    
    const [readyState, setReadyState] = useState(websocket.current.readyState);
    useEffect(() => setReadyState(websocket.current.readyState), [websocket.current.readyState]);
    
    const sendMessage = useCallback(message => websocket.current && websocket.current.send(message));
    const disconnect = useCallback(() => websocket.current.close());

    return { sendMessage, lastMessage, readyState, disconnect };
};

export const websocketContext = (url, protocol) => createContext(useWebSocket(url, protocol));

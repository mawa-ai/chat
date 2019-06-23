let commandQueue = [];
const listeners = {};

const addCommandListener = (type, callback) => {
    listeners[type] = callback;
    commandQueue.filter(c => c.type === type).forEach(c => processCommand(callback, c));
};

const removeCommandListener = type => {
    delete listeners[type];
};

const sendCommand = command => {
    if (listeners[command.type]) {
        processCommand(listeners[command.type], command);
    } else {
        commandQueue = [...commandQueue, command];
    }
};

const processCommand = (listener, command) => listener(command.data);

export {
    addCommandListener,
    removeCommandListener,
    sendCommand
};
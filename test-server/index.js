const WebSocketServer = require('websocket').server;
const http = require('http');

const mockData = require('./mock.json');

const server = http.createServer(function (request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server
});

function originIsAllowed(origin) {
    return origin === 'http://localhost:3001' || origin === 'http://localhost:3000';
}

wsServer.on('request', function (request) {
    if (!originIsAllowed(request.origin)) {
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    const params = new URLSearchParams(request.httpRequest.url.replace('/', ''));
    const botId = params.get('botId');
    if (!botId) {
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    const connection = request.accept();
    console.log((new Date()) + ' Connection accepted.');

    if (params.get('source') === "widget") {
        connection.send(JSON.stringify({
            id: 1,
            type: 'widget-configuration',
            data: mockData.widget
        }));
    } else {
        connection.send(JSON.stringify({
            id: 1,
            type: 'chat-theme',
            data: mockData.chat
        }));

        connection.send(JSON.stringify({
            id: 2,
            type: 'bot-settings',
            data: mockData.bot
        }));

        connection.send(JSON.stringify({
            id: 3,
            type: "text/plain",
            content: "Welcome to our service!"
        }));

        connection.send(JSON.stringify({
            id: 4,
            type: "text/plain",
            content: "How can I help you?"
        }));

        connection.send(JSON.stringify({
            id: 5,
            type: "text/plain",
            content: "How can I help you? How can I help you? How can I help you? How can I help you? " +
                "How can I help you? How can I help you? How can I help you? How can I help you? " +
                "How can I help you? How can I help you? How can I help you? How can I help you? " +
                "How can I help you? How can I help you? How can I help you? How can I help you? "
        }));
    }

    connection.on('message', function (message) {
        const data = JSON.parse(message.utf8Data);
        if (data.type === "user-input") {
            connection.send(JSON.stringify({
                id: parseInt(Math.random() * 100000),
                type: "text/plain",
                content: data.content,
                metadata: {
                    from: 'user'
                }
            }));
        }
    });

    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
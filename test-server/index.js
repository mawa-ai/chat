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

    const connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');

    connection.send(JSON.stringify({
        id: 1,
        type: 'widget-configuration',
        data: mockData.widget
    }));

    connection.on('message', function (message) {
        console.log(message);
    });

    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
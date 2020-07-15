// import app from './App';
// import * as Config from './Config';
// app.listen(Config.CHAT_PORT);

import * as http from 'http';
import * as Config from './Config';
import * as websocket from 'websocket';
import { UserStoreInstance } from './Stores/UserStore'
import { MessageStoreInstance } from './Stores/MessageStore'

const server = http.createServer();

const webSocketServer = new websocket.server({
    httpServer: server
});

webSocketServer.on('request', function (request) {
    request.accept(null, request.origin);
})

webSocketServer.on('connect', function (socket) {
    socket.on('message', function (message) {
        var data = JSON.parse(message.utf8Data);
        if (data.statuscode === Config.LOGIN_CODE) {
            UserStoreInstance.CheckUser(data.username, data.password).then(async (item) => {
                if (item) {
                    var messHistory;
                    await MessageStoreInstance.GetAllMessage().then(item =>{
                        messHistory = item;
                    })
                    socket.send(JSON.stringify({
                        statuscode: Config.LOGIN_CODE_SUCCESS,
                        userDetail: {
                            _id: item['_id'],
                            username: item['username']
                        },
                        messHistory: messHistory
                    }));
                } else {
                    socket.send(JSON.stringify({
                        statuscode: Config.LOGIN_CODE_FAILED,
                    }));
                }
            }).catch(err => {
                console.log(err);
                socket.send(JSON.stringify({
                    statuscode: Config.LOGIN_CODE_FAILED,
                }));
            });
        }
        // webSocketServer.connections.forEach(function each(client) {
        //     if (client !== socket && client.connected) {
        //         client.send(message.utf8Data);
        //     }
        // })
    })

    socket.on('close', function () {
        console.log("client close!");
    })
})

server.listen(Config.CHAT_PORT, function () {
    console.log((new Date()) + " Server is listening on port " + Config.CHAT_PORT);
});
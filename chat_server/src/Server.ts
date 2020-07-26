// import app from './App';
// import * as Config from './Config';
// app.listen(Config.CHAT_PORT);

import * as http from 'http';
import * as Config from './Config';
import * as websocket from 'websocket';
import { UserStoreInstance } from './Stores/UserStore'
import { MessageStoreInstance } from './Stores/MessageStore'
import mongoose from './DbConnection/MongoConnection'

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
                    await MessageStoreInstance.GetAllMessage().then(item => {
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
        else if (data.statuscode === Config.CHAT_CODE) {
            /*
                statuscode: '01'
                userId: '5f0de9a6b9afef7e7fb5b16d'
                message: 'hi from hoangnd'
            */
            var messageData = {
                message: data.message,
                time: new Date(),
                authorId: data.userId,
            }

            UserStoreInstance.GetUserById(data.userId).then(async item => {
                messageData["username"] = item["username"];
                messageData["_id"] = mongoose.Types.ObjectId();
                MessageStoreInstance.AddMessage(messageData);

                webSocketServer.connections.forEach(client => {
                    if(client.connected){
                        client.send(JSON.stringify({
                            statuscode: Config.CHAT_CODE,
                            data: messageData
                        }));
                    }
                })
            })
        }
    })

    socket.on('close', function () {
        console.log("client close!");
    })
})

server.listen(Config.CHAT_PORT, function () {
    console.log((new Date()) + " Server is listening on port " + Config.CHAT_PORT);
});
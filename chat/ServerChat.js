
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var UsuarioService = require('.././api/services/UsuarioService');

server.listen(3000, function() {
	console.log('Servidor corriendo en http://localhost:3000');
});



io.on('connection', async function(socket) {
    socket.on('userId', function(userId){
        var data = {
            userId : userId,
            socketId: socket.id
        }
        io.emit('r-socket-id', data);
    });

    socket.on('chat-list', async function(userId){
        let chatListResponse = {};

        if (userId === '' && (typeof userId !== 'string' || typeof userId !== 'number')) {

            chatListResponse.error = true;
            chatListResponse.message = `User does not exits.`;
            
            io.emit('chat-list-response',chatListResponse);
        }else{
            const result =  await UsuarioService.getChatList(userId, socket.id);
            //console.log("Server list " + JSON.stringify(result.userinfo));
            io.to(socket.id).emit('chat-list-response', {
                error: result !== null ? false : true,
                singleUser: false,
                chatList: result.chatlist
            });

            socket.broadcast.emit('chat-list-response', {
                error: result !== null ? false : true,
                singleUser: true,
                chatList: result.userinfo
            });
        }
    })

    /**
    * send the messages to the user
    */
    socket.on('add-message', async function(data){
        if (data.mensaje === '') {
            io.to(socket.id).emit(`add-message-response`,`Message cant be empty`); 
        }else if(data.id_usuario_envia === ''){
            io.to(socket.id).emit(`add-message-response`,`Unexpected error, Login again.`); 
        }else if(data.id_usuario_recibe === ''){
            io.to(socket.id).emit(`add-message-response`,`Select a user to chat.`); 
        }else{                    
            let toSocketId = data.toSocketId;
            const sqlResult = await MensajeService.insertMessages(data.id_usuario_envia, data.id_usuario_recibe, data.mensaje);
            io.to(toSocketId).emit(`add-message-response`, data); 
            //io.emit('add-message-response', data);
        }               
});

    /**
    * Logout the user
    */
    socket.on('logout', async function(userId){
    const isLoggedOut = await logoutUser.logoutUser(socket.id);
    io.to(socket.id).emit('logout-response',{
        error : false
    });
    socket.disconnect();
});
});


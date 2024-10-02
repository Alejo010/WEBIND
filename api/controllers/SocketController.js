/**
 * Created by Francisco Javier Deler O´Farril on 03/12/2018.
 */


const getWebSocketID = async (req, res) => {
    if (req.isSocket) {
        return res.json({
            WebSocketId: sails.sockets.getId(req)
        });
    } 
};

const joinChat = async (req, res) => {
    if (!req.isSocket) {
        return res.badRequest();
    }
    sails.sockets.join(req, 'chatHospital');
    // Send logout status to all user
    data = {
        //userLogoutId:  req.param('userLogoutId')     
    }
    sails.sockets.broadcast(req.param('roomName'), 'login-message-response', data);
    //console.log("AQUI: " + sails.sockets.getId(req));
    //sails.sockets.join(req, 'chat' + req.param('id'));
    return res.ok(); 
};

const addMessage = async (req, res) => {
    if (req.param('mensaje') === '') {
        sails.sockets.broadcast(req.param('mySocketId'), 'add-message-response', 'Message cant be empty');
    } else if(req.param('id_usuario_envia') === '') {
        sails.sockets.broadcast(req.param('mySocketId'), 'add-message-response', 'Unexpected error, Login again.');
    } else if(req.param('id_usuario_recibe') === '') {
        sails.sockets.broadcast(req.param('mySocketId'), 'add-message-response', 'Select a user to chat.');
    } else {                    
        const sqlResult = await MensajeService.insertMessages(req.param('id_usuario_envia'), req.param('id_usuario_recibe'), req.param('mensaje'));
        sails.sockets.broadcast(req.param('toSocketId'), 'add-message-response', sqlResult); 
        //io.emit('add-message-response', data);
    }
    return res.ok(); 
};

const leaveChat = async (req, res) => {
    // console.log("Room Name: " + req.param('roomName'));
    if ( _.isUndefined(req.param('roomName')) ) {
        return res.badRequest('`roomName` is required.');
    }
    if (!req.isSocket) {
        return res.badRequest('This endpoints only supports socket requests.');
    }
    var roomName = req.param('roomName');
    sails.sockets.leave(req, roomName, function(err) {
        if (err) {
            return res.serverError(err);
        }
        // Send logout status to all user
        data = {
            userLogoutId:  req.param('userLogoutId')     
        }
        sails.sockets.broadcast(req.param('roomName'), 'logout-message-response', data);
        return res.json({
            message: 'Left a fun room called ' + roomName + '!'
        });
    });
};

const sendMessage = async (req, res) => {
    try {
        messageType = req.param('messageType');
        sails.sockets.broadcast('chatHospital', messageType, {
        // sails.sockets.broadcast('chat' + req.param('id'), messageType, {
            message: req.param('message'),
            fromUser: req.param('fromUser'),
            toUser: req.param('toUser')
        });
        return res.ok();
    } catch(error){
        return error;   
    }
     
};

const sendUserId = async (req, res) => {
    if (!req.isSocket) {
        return res.badRequest();
    }
    var data = {
        userId : req.param('userId'),
        socketId: sails.sockets.getId(req)
    }
    sails.sockets.broadcast(req.param('roomName'), 'r-socket-id', data);
    return res.ok(); 
};

const getChatList = async (req, res) => {
    if (!req.isSocket) {
        return res.badRequest();
    }
    var userId = req.param('userId');
    let chatListResponse = {};
    if (userId === '' && (typeof userId !== 'string' || typeof userId !== 'number')) {

        chatListResponse.error = true;
        chatListResponse.message = `User does not exits.`;
        sails.sockets.broadcast(req.param('roomName'), 'chat-list-response', chatListResponse);
    } else {
        const result =  await UsuarioService.getChatList(userId, sails.sockets.getId(req));
        sails.sockets.broadcast(sails.sockets.getId(req), 'chat-list-response', {
            error: result !== null ? false : true,
            singleUser: false,
            chatList: result.chatlist
        });
        sails.sockets.broadcast(req.param('roomName'), 'chat-list-response', {
            error: result !== null ? false : true,
            singleUser: true,
            chatList: result.userinfo
        });
    }
    return res.ok(); 
};

module.exports = {
    getWebSocketID,
    joinChat,
    sendMessage,
    leaveChat,
    sendUserId,
    getChatList,
    addMessage
};
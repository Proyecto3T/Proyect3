const chatServer = (io) => {

    console.log("Chat Server Started!");
 
    io.on('connection', function(socket){
        console.log();
        console.log(`a user connected with id ${socket.conn.id}`);
        // socket.emit('chatMessageToGuapo','hola');
        
        // Receive the message
        socket.on('chatMessageToGuapo', data => {
            console.log(data)
            console.log("Ho!");
            socket.broadcast.emit('chatMessageToGuapo',{m:data.m, origin:data.origin});
        });

        socket.on('notify', data => {
            console.log(data)
            console.log("Ho!");
            socket.broadcast.emit(data.otherPlayerId,{otherPlayerId: data.playerId,matchId:data.matchId, type:data.type, name:data.name, league:data.league});
        });
        socket.on('finishMatch', data => {
            console.log(data)
            console.log("Ho!");
            socket.broadcast.emit(data.otherPlayerId,{otherPlayerId: data.playerId,matchId:data.matchId, type:data.type});
            socket.emit(data.playerId,{otherPlayerId: data.playerId,matchId:data.matchId, type:data.type});
        });
        socket.on('new-match', () => {
            socket.broadcast.emit('new-match');
        });
 
    });
 
 };
 
 module.exports = chatServer;
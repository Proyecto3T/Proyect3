const chatServer = (io) => {

    console.log("Chat Server Started!");
 
    io.on('connection', function(socket){
        console.log();
        console.log(`a user connected with id ${socket.conn.id}`);
        socket.emit('chatMessageToGuapo','hola');
        
        // Receive the message
        socket.on('chatMessageToGuapo', data => {
            console.log(data)
            console.log("Ho!");
            socket.broadcast.emit('chatMessageToGuapo',data);
        });
 
    });
 
 };
 
 module.exports = chatServer;
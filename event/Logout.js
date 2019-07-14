module.exports = (data, socket, onlineUser) =>{
    delete onlineUser[socket.uid]
}
var User = require('../models/user');
var api = require('../lib/api');


module.exports = (data, socket) => {

    api.findOne(User, {email: socket.uid}).then(resp => {
        socket.emit("userEmail", JSON.stringify({email: socket.uid, username: resp.username}))
    })

}
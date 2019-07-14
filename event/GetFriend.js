var User = require('../models/user');
var api = require('../lib/api')

module.exports = (socket) => {
    api.findOne(User, {email: socket.uid}).then(resp => {
        socket.emit("allFriends", JSON.stringify({friend: resp.friends}))
    })
}
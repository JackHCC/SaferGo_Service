var User = require('../models/user');
var api = require('../lib/api');

var Protect = (data, socket, onlineUser) => {

    dataJSON = JSON.parse(data)

    // let from = dataJSON.from;
    let from = socket.uid;
    let to = dataJSON.to;

    //保护方在线
    if(to in onlineUser){
        onlineUser[to].emit("protectResult", data)
    }else{
        socket.emit("protectResult", JSON.stringify({status: 231, msg: '对方不在线'}));
    }
}

module.exports = Protect;
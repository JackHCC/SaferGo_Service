var User = require('../models/user')
var api = require('../lib/api')

module.exports = (data, socket) => {
    dataJSON = JSON.parse(data);

    let friend = data.friend;

    let p1 = api.findOne(User, {username: friend});
    let p2 = api.findOne(User, {email: friend});
    let p3 = api.findOne(User, {mobilePhone: friend});

    Promise.all([p1, p2, p3]).then(resp => {
        if (resp[0] == null && resp[1] == null && resp[2] == null){
            socket.emit("addFriendResult", JSON.stringify({status:211, msg:'用户不存在'}))
        }else if(resp[0] != null && resp[1] == null && resp[2] == null){
            User.find({"friends.friends_email":friend,email: socket.uid},(err, doc) => {
                if(doc.length != 0){
                    socket.emit("addFriendResult", JSON.stringify({status: 221, msg: "好友已存在"}))
                }else{
                    api.updateArraySet(User,{email: socket.uid}, {friends:{friends_email: resp[0].friends_email, addTime: new Date().toLocaleString()}});
                    api.updateArraySet(User,{email: resp[0].friends_email}, {friends:{friends_email: socket.uid, addTime: new Date().toLocaleString()}});
                    socket.emit("addFriendResult", JSON.stringify({status: 200, msg: "添加好友成功"}))
                }
            })
        }else if(resp[0] == null && resp[1] != null && resp[2] == null){
            User.find({"friends.friends_email":resp[1].friends_email,email: socket.uid},(err, doc) => {
                if(doc.length != 0){
                    socket.emit("addFriendResult", JSON.stringify({status: 221, msg: "好友已存在"}))
                }else{
                    api.updateArraySet(User,{email: socket.uid}, {friends:{friends_email: resp[1].friends_email, addTime: new Date().toLocaleString()}});
                    api.updateArraySet(User,{email: resp[1].friends_email}, {friends:{friends_email: socket.uid, addTime: new Date().toLocaleString()}});
                    socket.emit("addFriendResult", JSON.stringify({status: 200, msg: "添加好友成功"}))
                }
            })
        }else if(resp[0] == null && resp[1] == null && resp[2] != null){
            User.find({"friends.friends_email":resp[2].friends_email,email: socket.uid},(err, doc) => {
                if(doc.length != 0){
                    socket.emit("addFriendResult", JSON.stringify({status: 221, msg: "好友已存在"}))
                }else{
                    api.updateArraySet(User,{email: socket.uid}, {friends:{friends_email: resp[2].friends_email, addTime: new Date().toLocaleString()}});
                    api.updateArraySet(User,{email: resp[2].friends_email}, {friends:{friends_email: socket.uid, addTime: new Date().toLocaleString()}});
                    socket.emit("addFriendResult", JSON.stringify({status: 200, msg: "添加好友成功"}))
                }
            })
        }
    })
}
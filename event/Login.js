var User = require('../models/user');
var api = require('../lib/api');


/**
 * 
 * @param {登录用户的信息} login 
 * @param {socket连接} socket 
 * @param {在线用户列表} onlineUser 
 */
var Login = (login, socket, onlineUser) => {
    loginJSON = JSON.parse(login)
    console.log(login)
    console.log("Login")
    let loginname = loginJSON.loginname;
    let password = loginJSON.password;

    let p1 = api.findOne(User, { username: loginname });
    let p2 = api.findOne(User, { email: loginname });

    Promise.all([p1, p2]).then(resp => {
        console.log("allPromise")
        if (resp[0] == null && resp[1] == null) {
            socket.emit("loginResult", JSON.stringify({ status: 211, msg: '用户名或邮箱不存在' }))
        }
        else if (resp[0] != null && resp[1] == null) {
            if (resp[0].password != password) {
                socket.emit("loginResult", JSON.stringify({ status: 212, msg: '密码错误' }))
            } else {
                socket.emit("loginResult", JSON.stringify({ status: 200, msg: '登陆成功' }))
                // if(!(resp[0].email in onlineUser)){
                socket.uid = resp[0].email;
                onlineUser[resp[0].email] = socket;
                // }
            }
        }
        else if (resp[0] == null && resp[1] != null) {
            if (resp[1].password != password) {
                socket.emit("loginResult", JSON.stringify({ status: 212, msg: '密码错误' }))
            } else {
                socket.emit("loginResult", JSON.stringify({ status: 200, msg: '登陆成功' }))
                // if(!(resp[1].email in onlineUser)){
                socket.uid = resp[1].email;
                onlineUser[resp[1].email] = socket;
                // }
            }
        }
    }).catch(err => {
        console.log(err)
    })
}

module.exports = Login;
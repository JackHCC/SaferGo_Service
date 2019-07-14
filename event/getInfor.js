var User = require('../models/user')
var api = require('../lib/api')

module.exports = (data, socket) => {

    dataJSON = JSON.parse(data)
    
    let p1 = api.findOne(User, {username: dataJSON.search})
    let p2 = api.findOne(User, {email: dataJSON.search})

    Promise.all([p1,p2]).then(resp => {
        if(resp[0] == null && resp[1] == null){
            socket.emit("searchResult", JSON.stringify({status:211, msg:'用户名或邮箱不存在'}))
        }
        else if(resp[0] != null && resp[1] == null) {            
            socket.emit("searchResult", JSON.stringify({
                status: 200,
                msg: "成功",
                id: resp[0]._id,
                email: resp[0].email,
                username: resp[0].username,
                imageUrl: resp[0].imageUrl,
                age: resp[0].age,
                sex: resp[0].sex,
                mobilePhone: resp[0].mobilePhone,
                emergencyPhone: resp[0].emergencyPhone,
                individuality: resp[0].individuality,
                birthplace: resp[0].birthplace,
                livePlace: resp[0].livePlace,
                created_at: resp[0].created_at,
                msgTemplate: resp[0].msgTemplate
            }))
        }
        else if(resp[0] == null && resp[1] != null) {
            socket.emit("searchResult", JSON.stringify({
                status: 200,
                msg: "成功",
                id: resp[1]._id,
                email: resp[1].email,
                username: resp[1].username,
                imageUrl: resp[1].imageUrl,
                age: resp[1].age,
                sex: resp[1].sex,
                mobilePhone: resp[1].mobilePhone,
                emergencyPhone: resp[1].emergencyPhone,
                individuality: resp[1].individuality,
                birthplace: resp[1].birthplace,
                livePlace: resp[1].livePlace,
                created_at: resp[1].created_at,
                msgTemplate: resp[1].msgTemplate
            }))
        }
    })
    
}
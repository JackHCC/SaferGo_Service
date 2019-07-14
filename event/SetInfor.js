var User = require('../models/user')
var api = require('../lib/api');

module.exports = (data, socket) =>{
    dataJSON = JSON.parse(data);
    if (dataJSON.sex != undefined){
        api.update(User, {email: socket.uid}, {sex: dataJSON.sex})
    }
    if (dataJSON.mobilePhone != undefined){
        api.update(User, {email: socket.uid}, {mobilePhone: dataJSON.mobilePhone})
    }
    if (dataJSON.emergencyPhone != undefined){
        api.update(User,{email: socket.uid}, {emergencyPhone: dataJSON.emergencyPhone})
    }
    if (dataJSON.birthplace != undefined){
        api.update(User, {email: socket.uid}, {birthplace: dataJSON.birthplace})
    }
    if (dataJSON.livePlace != undefined){
        api.update(User, {email: socket.uid}, {livePlace: dataJSON.livePlace})
    }
    if (dataJSON.individuality != undefined){
        api.update(User, {email: socket.uid}, {individuality: dataJSON.individuality})
    }
    if (dataJSON.msgTemplate != undefined ){
        api.update(User, {email: socket.uid}, {msgTemplate: dataJSON.msgTemplate})
    }

    // api.findOne(User, {email: socket.uid}).then(resp =>{
        
    // })
}
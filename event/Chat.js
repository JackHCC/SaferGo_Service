
var Chat = (data, onlineUser) => {

    dataJSON = JSON.parse(data)

    let from = dataJSON.from;
    let to = dataJSON.to;

    //接受消息方在线
    if(to in onlineUser){
        onlineUser[to].emit("chat", data)
    }else{
        //待添加对方不在线，将消息保存到数据库的操作
    }
}


module.exports = Chat;
var express = require('express');
var router = express.Router();

var User = require('../models/user');

var api = require('../lib/api');


//添加好友
router.get('/add_user', (req, res, next) => {
    let selfemail = req.query.selfemail;
    let friendemail = req.query.friendemail;

    var p1 = api.findOne(User, {email: selfemail});
    var p2 = api.findOne(User, {email: friendemail});

    Promise.all([p1, p2]).then(resp => {
        if(resp[0] == null || resp[1] == null){
            res.end(JSON.stringify({status: 213, msg: "该邮箱未注册"}));
        }else{
            User.find({"friends.friends_email":friendemail,email: selfemail},(err, doc) => {
                if(doc.length != 0){
                    res.end(JSON.stringify({status: 221, msg: "好友已存在"}))
                }else{
                    api.updateArraySet(User,{email: selfemail}, {friends:{friends_email: friendemail, addTime: new Date().toLocaleString()}});
                    api.updateArraySet(User,{email: friendemail}, {friends:{friends_email: selfemail, addTime: new Date().toLocaleString()}});
                    res.end(JSON.stringify({status: 200, msg: "添加好友成功"}));
                }
            })
        }
    })
})


module.exports = router;
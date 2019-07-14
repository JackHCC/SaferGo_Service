var express = require('express');
var router = express.Router();

var User = require('../models/user');

var api = require('../lib/api');

//查找用户名或者邮箱对应的用户信息
router.get('/user', (req, res, next) => {
    let email_username = req.query.email_username;

    var p1 = api.findOne(User,{email: email_username});
    var p2 = api.findOne(User, {username: email_username});

    Promise.all([p1, p2]).then(resp =>{
        if(resp[0] == null && resp[1] == null)
            res.end(JSON.stringify({status:214, msg:'查找的用户不存在'}))
        else {
            if(resp[0] != null && resp[1] == null) {
                res.send({
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
                    created_at: resp[0].created_at
                })
            }else if(resp[1] != null && resp[0] == null){
                res.send({
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
                    created_at: resp[1].created_at
                })
            }
        }
    })
})


//根据邮件查找用户全部好友信息
router.get('/all_friend', (req, res, next) =>{

    let email = req.query.email;

    var p1 = api.findOne(User,{email: email});
    var p2 = api.findOne(User, {username: email});

    Promise.all([p1, p2]).then(resp => {
        if(resp[0] == null && resp[1] == null){
            res.end(JSON.stringify({status:214, msg:'查找的用户不存在'}))
        }else{
            if(resp[0] != null && resp[1] == null) {
                res.send({
                    friends: resp[0].friends
                })
            }else if(resp[1] != null && resp[0] == null){
                res.send({
                    friends: resp[1].friends
                })
            }
        }
    })
})

module.exports = router;
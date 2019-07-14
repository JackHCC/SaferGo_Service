var express = require('express');
var router = express.Router();
var User = require('../models/user');
var api = require('../lib/api');

router.post('/', (req, res, next) =>{
    let loginname = req.query.loginname;
    let password = req.query.password;


    let p1 = api.findOne(User, {username: loginname});
    let p2 = api.findOne(User, {email: loginname});

    Promise.all([p1, p2]).then(resp => {
        console.log(resp)
        if(resp[0] == null && resp[1] == null)
            res.end(JSON.stringify({status:211, msg:'用户名或邮箱不存在'}))
        else if(resp[0] != null && resp[1] == null) {
            if(resp[0].password != password){
                res.end(JSON.stringify({status:212, msg:'密码错误'}))
            }else{
                // res.end(mergeJson([resp[0]], JSON.stringify({status:200, msg: 登录成功})));
                // res.send(resp[0]);
                res.end(JSON.stringify({status:200, msg:'登陆成功'}))
            }
        }
        else if(resp[0] == null && resp[1] != null) {
            if(resp[1].password != password){
                res.end(JSON.stringify({status:212, msg:'密码错误'}))
            }else{
                // res.end(mergeJson([resp[1]], JSON.stringify({status:200, msg: 登录成功})));
                // res.send(resp[1])
                res.end(JSON.stringify({status:200, msg:'登陆成功'}))
            }
        }
    })
})

module.exports = router;
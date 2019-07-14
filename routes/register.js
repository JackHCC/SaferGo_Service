var express = require('express');
var router = express.Router();
var api = require('../lib/api')

var User = require("../models/user");
var Code = require("../models/code");

var sendMail = require("../utils/sendemail");

//发送验证码
router.get("/get_code", (req, res, next) => {
    let email_get = req.query.email

    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
    if(email_get == '') {
        res.end(JSON.stringify({status:201, msg:'未填写邮箱'}))
    }else if(!reg.test(email_get)) {
        console.log("202")
        res.end(JSON.stringify({status:202, msg:'邮箱非法'}))
    }else {
        api.findOne(User, {
            email: email_get
        }).then(resq => {
            if(resq != null){
                res.end((JSON.stringify({status:203, msg:'该邮箱已被注册'})));
            }else{
                let code = "";
                for(let i = 0; i < 6; i++){
                    code += Math.floor(Math.random()*10);
                }
                api.findOne(Code, {
                    email: email_get
                }).then(resq => {
                    if(resq == null){
                        api.save(Code, {
                            email: email_get,
                        }).then(res => {
                            api.update(Code, {
                                email: email_get,
                            },
                            {
                                email: email_get,
                                code: code
                            })
                            sendMail(email_get, code);
                        })
                    }else{
                        api.update(Code, {
                            email: email_get,
                        },
                        {
                            email: email_get,
                            code: code
                        })
                        sendMail(email_get, code);
                    }
                })
                
                res.end(JSON.stringify({status: 200, msg:'验证码已发送到邮箱'}));
            }
        })
    }
})

//添加用户
router.post('/add_user', (req, res, next) => {
    let email = req.body.email
    let code = req.body.code
    let username = req.body.username
    let password1 = req.body.password1
    let password2 = req.body.password2

    var p1 = api.findOne(Code, {email: email});
    var p2 = api.findOne(User, {username: username});

    console.log(req.body);

    Promise.all([p1, p2]).then(resp => {
        if(resp[0] == null) 
            res.end(JSON.stringify({status:204, msg:'请先获取验证码再注册'}));
        else if(resp[1] != null)
            res.end(JSON.stringify({status:206, msg:'用户名已被注册'}))
        else {
            if(resp[0].code != code)
                res.end(JSON.stringify({status:205, msg:'验证码错误'}))
            else {
                if(password1 != password2) 
                    res.end(JSON.stringify({status:207, msg:'密码不一致'}))
                else
                    api.save(User,{
                        email: email,
                        username: username,
                        password: password1,
                        created_at: new Date().toLocaleString(),
                        mobilePhone: "",
                        imageUrl: '',
                        friends: [],
                        individuality: "",
                        birthplace: "",
                        livePlace: "",
                        emergencyPhone: ""
                    }).then(() => {
                        res.end(JSON.stringify({status:200, msg:'注册成功'}))
                    })
            }
        }
    })
})

module.exports = router;
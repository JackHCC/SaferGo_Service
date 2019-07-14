var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Code = require('../models/code');
var api = require('../lib/api')

var sendMail = require('../utils/sendemail');

router.get('/get_code', (req, res, next) => {
    let email = req.query.email;
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if(email == '') {
        res.end(JSON.stringify({status:201, msg:'未填写邮箱'}));
    }else if(!reg.test(email)) {
        res.end(JSON.stringify({status:202, msg:'邮箱非法'}));
    }else{
        api.findOne(User, {email: email}).then(resp => {
            if(resp == null) {
                res.end(JSON.stringify({status:213, msg:'该邮箱未注册'}))
            }else{
                let code = "";
                for(let i = 0; i < 6; i++){
                    code += Math.floor(Math.random()*10);
                }
                api.update(Code, {
                    email: email,
                },
                {
                    email: email,
                    code: code
                })
                sendMail(email_get, code);
                res.end(JSON.stringify({status: 200, msg:'验证码已发送到邮箱'}));
            }
        })
    }
});

router.get('/check_code', (req, res, next) => {
    let email = req.query.email
    let code = req.query.code

    api.findOne(Code, {email: email}).then(resp => {
        if(resp == null) {
            res.end(JSON.stringify({status:213, msg:'该邮箱未注册'}))
        }
        else {
            if(resp.code != code){
                res.end(JSON.stringify({status:205, msg:'验证码错误'}))
            }
            else {
                res.end(JSON.stringify({status:200, msg:'邮箱验证成功'}))
            }
        }
    });
});

router.post('/modify_pwd', (req, res, next) => {
    let email = req.body.email
    let password1 = req.body.password1
    let password2 = req.body.password2
    if(password1 != password2){
        res.end(JSON.stringify({status:212, msg:'密码错误'}));
    }
    else {
        api.update(User, {email: email},{
            password: password1
        }).then(() => {
            res.end(JSON.stringify({status:200, msg:'修改密码成功'}));
        })
    }
});

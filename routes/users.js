// 更新用户信息相关

var express = require('express');
var router = express.Router();

var Users = require("../models/user");
var api = require("../lib/api");

//用户名
router.get('/username', (req, res, next) =>{
    
    let email = req.query.email;
    let username = req.query.username

    api.update(Users, {email: email},{username: username});
    res.end();
});

//年龄
router.get('/age', (req, res, next) =>{
    
    let email = req.query.email;
    let age = req.query.age

    api.update(Users, {email: email},{age: age});
    res.end();
});

//性别
router.get('/sex', (req, res, next) =>{
    
    let email = req.query.email;
    let sex = req.query.sex

    api.update(Users, {email: email},{sex: sex});
    res.end();
});

//手机号
router.get('/mobilePhone', (req, res, next) =>{
    
    let email = req.query.email;
    let mobilePhone = req.query.mobilePhone

    api.update(Users, {email: email},{mobilePhone: mobilePhone});
    res.end();
});

//个性签名
router.get('/individuality', (req, res, next) =>{
    
    let email = req.query.email;
    let individuality = req.query.individuality

    api.update(Users, {email: email},{individuality: individuality});
    res.end();
});

//出生地籍贯
router.get('/birthplace', (req, res, next) =>{
    
    let email = req.query.email;
    let birthplace = req.query.birthplace

    api.update(Users, {email: email},{birthplace: birthplace});
    res.end();
});

//居住地
router.get('/livePlace', (req, res, next) =>{
    
    let email = req.query.email;
    let livePlace = req.query.livePlace

    api.update(Users, {email: email},{livePlace: livePlace});
    res.end();
});

router.get('/emergencyPhone', (req, res, next) =>{
    
    let email = req.query.email;
    let emergencyPhone = req.query.emergencyPhone

    api.update(Users, {email: email},{emergencyPhone: emergencyPhone});
    res.end();
});

module.exports = router;

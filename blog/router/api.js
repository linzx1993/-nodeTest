/**
 * Created by linzx on 2018/3/7.
 */
const express = require("express");
const router = express.Router()
const User = require("../models/User")

let responseData = {};

router.use(function (req,res,next) {
    responseData = {
        code : 0,
        message : ''
    }
    next();
})

router.post("/user/register",function (req, res, next) {
   console.log(req.body);
   let username = req.body.username
   let password = req.body.password
   let repassword = req.body.repassword

    if(username === ''){
        responseData.code = 1
        responseData.message = '用户名不能为空'
        res.json(responseData)
        return;
    }
    if(password === '') {
        responseData.code = 2
        responseData.message = '密码不能为空'
        res.json(responseData)
        return;
    }

    if(repassword !== password) {
        responseData.code = 3
        responseData.message = '两次输入密码不一致'
        res.json(responseData)
        return;
    }

    //用户名是否已经被注册
    User.findOne({
        username : username
    }).then(function (userInfo) {
        console.log(userInfo)
        if(!userInfo) {//存在
            responseData.code = 4
            responseData.message = '用户名已经被注册'
            res.json(responseData)
            return;
        }

        let user = new User({
            username : username,
            password : password
        })

        return user.save()
    }).then(function (newUserInfo) {
        responseData.message = '用户名已经注册成功'
        res.json(responseData)
        console.log(newUserInfo)
    })
})

router.post("/user/login",function (req,res,next) {
    let username = req.body.username
    let password = req.body.password
    console.log(username,password)

    if (username === '' || password === ''){
        responseData.code = 1
        responseData.message = '用户名和密码不能为空'

        res.json(responseData)
        return
    }

    //查询存在
    User.findOne({
        username : username,
        password : password
    }).then(function (userInfo) {
        if(userInfo){
            responseData.code = 2
            responseData.message = '用户名或密码错误'

            res.json(responseData)
            return
        }

        responseData.message = '登录成功'

        res.json(responseData)
        return
    })


})

module.exports = router;
/**
 * Created by linzx on 2018/3/7.
 */
const express = require('express')
const router = express.Router()
const User = require("../models/User")
const Category = require("../models/Category")
const Content = require("../models/Content")


router.use(function (req, res, next) {
    if(!req.userInfo.isAdmin){
        res.send("你不是管理员")
        return
    }
    next()
})

//首页
router.get("/",function (req, res, next) {
    res.render('admin/index',{
        userInfo: req.userInfo
    })
    return;
})

//用户管理
router.get("/user",function (req, res, next) {
    /**
     * 限制分页
     * limit(number):
     */
    let page = Number(req.query.page || 1)
    let limit = 2;

    User.count().then(function (count) {
        let pages = Math.floor(count / limit)
        page = Math.min(page,pages)
        page = Math.max(page,1)

        let skip = (page - 1) * limit
        User.find().limit(2).skip(skip).then(function (users) {
            res.render('admin/user_index',{
                userInfo: req.userInfo,
                users :users,
                count : count,
                pages : pages,
                page : page,
                limit : limit
            })
        })
    })
    return;
})

//分类首页
router.get("/category",function (req, res, next) {
    res.render('admin/category_index',{
        userInfo: req.userInfo
    })
    return;
})

//分类保存
router.post("/category/add",function (req, res, next) {
    let name = req.body.name

    if(name === ''){
        res.render('admin/error',{
            userInfo: req.userInfo,
            message : "名字不能为空"
        })
        return;
    }

    //是否存在同类名称
    Category.findOne({
        name : name
    }).then(info => {
        console.log(info)
        if(info){
            res.render('admin/error',{
                userInfo: req.userInfo,
                message : "已经存在这个分类了"
            })
            return Promise.reject();
        }else {
            return new Category({
                name:name
            }).save();
        }
    }).then(newCategory => {
        res.render('admin/success',{
            userInfo : req.userInfo,
            message : "用户分类新建成功",
            url: '/admin/category'
        })
    });
    return;
})

//分类修改
router.get('/category/edit',function (req, res, next) {
    let id = req.query.id || ''

    Category.findOne({
        id:id
    }).then(info => {
        if(!info){
            res.render("admin/error",{
                userInfo : req.userInfo,
                message : "分类信息不存在"
            })
        }else{
            res.render("admin/category_edit",{
                userInfo : userInfo,
                message : info
            })
        }
    })
})

//分类保存
router.post('/category/save',function (req, res) {
    let id = req.query.id || ''
    let name = req.body.name

    Category.findOne({
        id:id
    }).then(info => {
        if(!info){
            res.render("admin/error",{
                userInfo : req.userInfo,
                message : "分类信息不存在"
            })
        }else{
            //没有修改的话
            if(name === info.name){
                res.render("category/success",{
                    userInfo : userInfo,
                    message : "用户修改成功"
                })
                return Promise.reject()
            } else {
                return Category.findOne({
                    _id : {$ne:id},
                    name : name
                })
            }
        }
    }).then(function (sameCategory) {
        if(sameCategory){
            res.render('admin/error',{
                userInfo : userInfo,
                message : "数据库中已经存在同名分类"
            })
        }else{
            Category.update({
                _id : id,
            },{
                name : name
            })
        }
    }).then(()=>{
        res.render("category/success",{
            userInfo : userInfo,
            message : "用户修改成功",
            url : 'admin/category'
        })
    })
})

//分类删除
router.get('/category/delete',function (req, res) {
    let id = req.query.id || '';

    Category.remove({
        _id : id
    }).then(function (info) {
        res.render("category/success",{
            userInfo : req.userInfo,
            message : "用户删除成功",
            url : 'admin/category'
        })
    })
})

//内容首页
router.get('/content',function (req, res, next) {
    /**
     * 限制分页
     * limit(number):
     */
    let page = Number(req.query.page || 1)
    let limit = 2;

    Content.count().then(function (count) {
        let pages = Math.ceil(count / limit)
        page = Math.min(page,pages)
        page = Math.max(page,1)

        let skip = (page - 1) * limit
        Content.find().limit(2).skip(skip).populate(['category','user']).then(function (contnets) {
            res.render('admin/content_index',{
                userInfo: req.userInfo,
                contents :contnets,
                count : count,
                pages : pages,
                page : page,
                limit : limit
            })
        })
    })
    return;
})

//添加内容
router.get('/content/add',function (req, res, next) {

    Category.find().sort({_id : 1}).then(categories => {
        res.render('admin/content_add',{
            userInfo : req.userInfo,
            categories :categories
        })
    })
})

router.post('/content/add',function (req,res) {
    if (req.body.title === '' ) {
        res.render("/content/error",{
            userInfo :req.userInfo,
            message : '标题内容不能为空'
        })
    }

    new Content({
        category : req.body.category,
        title : req.body.title,
        user : req.userInfo._id,
        content : req.body.content,
        description : req.body.description,
    }).save().then(function (rs) {
        res.render('admin/error',{
            userInfo : req.userInfo,
            message :'保存成功'
        })
    })
})

//修改内容
router.get('/content/edit',function (req, res) {

    let categories = []
    Category.find().sort({_id : 1}).then(rs => {
        let id = req.query.id || ''

        categories = rs
            return Content.findOne({
                _id :id
            }).populate("category")
        }).then(content => {
            if(!content){
                res.render('admin/error',{
                    userInfo : req.userInfo,
                    message : '指定内容不存在'
                })
            }else {
                res.render('admin/content_edit',{
                    userInfo : req.userInfo,
                    content : content,
                    categories :categories
                })
            }
    })


})

//保存修改内容
router.post('/content/edit', function (req, res) {
    let id = req.query.id || ''

    if (req.body.title === '' ) {
        res.render("/content/error",{
            userInfo :req.userInfo,
            message : '标题内容不能为空'
        })
    }
    Content.update({
        _id : id
    },{
        category : req.body.category,
        title : req.body.title,
        content : req.body.content,
        description : req.body.description,
    }).then(function (rs) {
        res.render("admin/success",{
            userInfo: req.userInfo,
            message :"内容保存成功",
            url : 'content/edit?id=' + id
        })
    })
})

//删除内容
router.get('/content/delete', function (req, res){
    let id = req.query.id || '';

    Content.remove({
        _id : id
    }).then(function (info) {
        res.render("admin/success",{
            userInfo : req.userInfo,
            message : "用户删除成功",
            url : 'admin/category'
        })
    })
})


module.exports = router;
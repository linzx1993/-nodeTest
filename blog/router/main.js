/**
 * Created by linzx on 2018/3/7.
 */
const express = require('express')
const router = express.Router()
const Category = require("../models/Category")
const Content = require("../models/Content")

//处理通用数据
let data = {}
router.use(function (req, res, next) {
    data = {
        userInfo : req.userInfo,
        categories : [],
    }

    Category.find().then(categories => {
        data.categories = categories
        next()
    })
})

router.get("/", function (req, res, next) {

        data.category = req.query.category || ''
        data.page = Number(req.query.page || 1)
        data.limit = 2
        data.pages = 0
        data.count = 0

    let where = {}
    if(where){
        where.category = data.category
    }

    //读取所有的分类信息
    Content.where(where).count().then(function (count) {
        data.count = count;
        data.pages = Math.ceil(data.count / data.limit)
        data.page = Math.min(data.page,data.pages)
        data.page = Math.max(data.page,1)

        let skip = (data.page - 1) * data.limit



        return Content.where(where).find().limit(data.limit).skip(skip).sort({addTime : -1}).populate(['category','user']);
    }).then(function (contents) {
        data.contents = contents
        res.render('../views/main/index',data)
    })

});

router.get("/view",function (req, res) {
    let contentId = req.query.contentid

    Content.findOne({
        _id : contentId
    }).then(function (content) {
        data.content = content

        content.views ++
        content.save()

        res.render('main/views',data)
    })
})


module.exports = router;
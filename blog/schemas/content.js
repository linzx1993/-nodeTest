/**
 * Created by linzx on 2018/3/7.
 */
const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    //分类名
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    //添加时间
    addTime : {
        type :Date,
        default : new Date()
    },
    //阅读量
    views : {
        type : Number,
        default :0
    },
    //内容标题
    description : {
        type: String,
        default: ''
    },
    //内容简介
    title : String,
    //内容标题
    content : {
        type: String,
        default: ''
    },

    //评论
    comments : {
        type :[],
        default :''
    }
})
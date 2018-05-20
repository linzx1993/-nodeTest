/**
 * Created by linzx on 2018/3/7.
 */
const mongoose = require("mongoose");

//确定好该数据库的数据类型
module.exports = new mongoose.Schema({
    username : String,
    password : String,
    isAdmin : {
        type: Boolean,
        default : false
    }
})
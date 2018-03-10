/**
 * Created by linzx on 2018/3/7.
 */
const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    username : String,
    password : String,
    isAdmin : {
        type: Boolean,
        default : false
    }
})
/**
 * Created by linzx on 2018/3/7.
 */
const mongoose = require("mongoose")
const userSchema = require("../schemas/user");

module.exports = mongoose.model('User',userSchema)
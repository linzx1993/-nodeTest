/**
 * Created by linzx on 2018/3/7.
 */
const mongoose = require("mongoose")
const contentSchema = require("../schemas/content");

module.exports = mongoose.model('Cotnent',contentSchema);
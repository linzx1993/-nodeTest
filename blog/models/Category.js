/**
 * Created by linzx on 2018/3/7.
 */
const mongoose = require("mongoose")
const categoriesSchema = require("../schemas/categories");

module.exports = mongoose.model('Category',categoriesSchema)
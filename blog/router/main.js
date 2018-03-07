/**
 * Created by linzx on 2018/3/7.
 */
const express = require('express')
const router = express.Router()

router.get("/",function (req, res, next) {
    res.send("user");
});

module.exports = router;
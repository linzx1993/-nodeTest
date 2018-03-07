/**
 * Created by linzx on 2018/3/7.
 */
const express = require('express')
const router = express.Router()

router.get("/user",function (req, res, next) {
    res.send("user");
});

module.exports = router;
/**
 * Created by linzx on 2018/3/6.
 */
let express = require("express")
//模板
const swig = require("swig")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const Cookies = require("cookies")

let app = express();
//设置静态文件托管
//用户访问文件以public开始
app.use("/public",express.static(__dirname + '/public'));

//arguments: [模板名称后缀，解析模板的方法]
app.engine("html", swig.renderFile);
//设置模板文件的目录arguments:[第一个参数必须是views，第二个参数是目录]
app.set("views", "./views")
//设置模板文件的目录,arguments:[view engine，与app.engine定义的名称是一致的]
app.set('view engine', 'html')
//
swig.setDefaults({cache: false})

app.use(bodyParser.urlencoded({
    extended:true
}))

let User = require("./models/User")

app.use(function (req, res, next) {
    req.cookies = new Cookies(req,res)


    req.userInfo = {}
    if(req.cookies.get('userInfo')){
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'))
            //获取当前用户登录的类型
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin)
                next()
            })
        } catch(e){
            next()
        }
    } else {
        next()
    }

})


app.use("/admin", require('./router/admin'))
app.use("/api", require('./router/api'))
app.use("/", require('./router/main'))

mongoose.connect('mongodb://localhost:27018/blog',function (err) {
    if(err){
        console.log("数据库连接失败")
    }else{
        console.log("数据库连接成功")
        app.listen(8081);
    }
})


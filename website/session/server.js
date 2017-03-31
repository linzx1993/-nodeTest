/**
 * Created by linzx on 2017/3/31.
 */
const connect = require("connect"),users = require("./users");

const server = connect(
    connect.logger("dev"),
    connect.bodyParser(),
    connect.cookieParser(),
    connect.session({secret:"my app secret"}),
    //检查用户是否登录，没有登录交给中间件处理
    function (req,res,next) {
        if("/" == req.url && req.session.logged_in){
            res.writeHead(200,{"content-type" : "text/html"});
            res.end("Welcome back <b>" + req.session.name + "</b><a href='/logout'>Logout</a> ");
        }else{
            next();
        }
    },function (req, res, next) {
        //紧接着中间件给出一个登录表单
        if("/" == req.url && "GET" == req.method){
            res.writeHead(200,{"content-type" : "text/html"});
            res.end([
                "<form action='login' method='post'>",
                    '<fieldest>',
                        "<legend>please log in</legend>",
                        "<p>User: <input type='text' name='user'></p>",
                        "<p>password: <input type='password' name='password'/>",
                        "<button>submit</button>",
                    "</fieldest>",
                "</form>"
            ].join(""))
        }else{
            next();
        }
    },function (req,res,next) {
        //再检测登录表单的信息是否与用户信息匹配，匹配则认为登录成功
        if("/login" == req.url && "POST" == req.method){
            res.writeHead(200);
            if(!users[req.body.user] || req.body.password != users[req.body.user].password){
                res.end("Bad username/password");
            }else{
                req.session.logged_in = true;
                req.session.name = users[req.body.user].name;
                res.end("Authenticated");
            }
        }else{
            next();
        }
    },function (req, res, next) {
        if("/logout" == req.url){
            req.session.logged_in = false;
            res.writeHead(200);
            res.end("Logged out");
        }else{
            next();
        }
    }
    );
server.listen(3000);
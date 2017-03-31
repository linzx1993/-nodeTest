/**
 * Created by linzx on 2017/3/2.
 */
module.exports = function(opts){
    var time = opts.time || 100;
    return function(req,res,next){
        var timer = setTimeout(function () {
            console.log('\033[90m%s %s\033[39m \033[91mis taking too ling!\033[39m',req.method,req.url);
        },time);
        var end = res.end;
        res.end = function(chunk,encoding){
            res.end = end;
            res.end(chunk,encoding);
            clearTimeout(timer);
        };
        next();
    }
};
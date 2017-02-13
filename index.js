/**
 * Created by yiend on 2017/2/11.
 */
var fs = require("fs"),
    stdin = process.stdin,
    stdout = process.stdout;
// console.log(fs.readdirSync(__dirname));//同步方式
//异步方式
fs.readdir(process.cwd(),function(err,files){
    console.log(files);
    if(!files.length) {return console.log("没有文件")}
    console.log("select files which file or directory you want to see/n");
    function file(i){
        var filename = files[i];
        fs.stat(__dirname + "/" + filename,function (err, stat) {
            if(stat.isDirectory()){
                console.log('  ' + i + '\033[36m' + filename +'\033[39m');//\033[39m和\033[36m显示颜色
            }else{
                console.log('  ' + i + '\033[90m' + filename +'\033[39m');
            }
            if(++i == files.length){
                read();
            }else{
                file(i);
            }
        })
    }
    function read(){
        console.log(" ");
        process.stdout.write('  \033[33mEnter your choice: \033[39m');
        process.stdin.resume();
        process.stdin.setEncoding("utf8")
    }
    file(0);
});
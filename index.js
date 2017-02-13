/**
 * Created by yiend on 2017/2/11.
 */
var fs = require("fs");
// console.log(fs.readdirSync(__dirname));//同步方式
//异步方式
fs.readdir(process.cwd(),function(err,files){
    console.log(files);
    if(!files.length) {return console.log("没有文件")};
    console.log("select files which file or directiory you want to see/n")
    function file(i){
        var filename = files[i];
        fs.stat(__dirname + "/" + filename,function (err, stat) {
            if(stat.isDirectory()){
                console.log('  ' + i + '\033[36m' + filename +'\033[39m]');
            }else{
                console.log('  ' + i + '\090[36m' + filename +'\033[39m]');
            }
            i++;
            if(i == files.length){
                console.log('123');
                process.stdout.write('  \033[33mEnter your choice: \033[39m');
                process.stdin.resume();
            }else{
                file(i);
            }
        })
    }
    file(0);
})
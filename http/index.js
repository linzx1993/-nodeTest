/**
 * Created by yiend on 2017/2/14.
 */
var net = require("net");
var count = 0;
var user = {};
var server = net.createServer(function(conn){
    console.log("\33[90m    new connection \33[39m");
    var nickname;//连入用户的名称
    conn.write('\n > welcome to \033[92mnode-chat \033[39m!' +
        '\n >' + count + 'other people connected to this time.' +
        '\n > please write your name and press enter'
    );
    conn.on("close",function(){
        count --;
        delete user[nickname];
    });
    conn.on("data",function(data){
        data.replace("\r\n","");
        if(!nickname){
            if(user[data]){
                conn.write("\033[93m nickname is already use try again\033[36m");
                return
            }else{
                nickname = data;
                user[nickname] = conn;
                // broadcast("\033[90m >" + nickname + "join the room \033[39m")
                for(var i in user){
                    user[i].write("\033[90m >" + nickname + "join the room \033[39m" );
                }
            }
        }else{
            for(var i in user){
                if(i != nickname){
                    user[i].write("\033[96m" + nickname + "\033[39m" + data + "\n");
                }
            }
        }
    });

    function broadcast(msg,exceptMyself){
        for(var i in user){
            if(!exceptMyself || i != nickname){
                user[i].write(msg);
            }
        }
    }
    conn.setEncoding('utf8');
    count++;
});
server.listen(3000,function(){
    console.log("\33[96m    server listening on :* 3000 \33[39m");
});
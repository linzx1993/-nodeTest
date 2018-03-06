/**
 * Created by linzx on 2018/3/6.
 */
let project = {
    name : 'linzx',
    fileData : [
        {type :'dir',name : 'css'},
        {type :'dir',name : 'js'},
        {type :'dir',name : 'image'},
        {type :'file',name : 'index.html',content : '<html>\n\t<head>\n\t</head><title>\n\t</title><body>\n\t<h1>htllo world</h1></body></html>'},
    ]
}

let fs = require("fs");
if(project.name){
    fs.mkdirSync(project.name)
    let fileData = project.fileData;

    if(fileData && fileData.forEach){
        console.log(fileData)
        fileData.forEach(f => {
            f.path = project.name + "/" + f.name;
            switch (f.type){
                case 'dir':
                    fs.mkdirSync(f.path);
                    break
                case 'file' :
                    fs.writeFileSync(f.path,f.content);
                    break;
                default:
                        break;
            }
        })
    }
}
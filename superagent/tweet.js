var request = require("superagent");
request.get("http://twitter.com/search.json")
.send({q : "Justin bieber"})
.end(function (res) {
    console.log(res);
})
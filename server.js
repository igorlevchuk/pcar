var http = require('http');
var url = require("url");
var frmprc = require("./formproc");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received"); 

    if (request.method.toLowerCase() == 'get') {
       route(handle, pathname, request, response);
    } else if (request.method.toLowerCase() == 'post') {
       frmprc.process(request, response);
    }
  }

  http.createServer(onRequest).listen(1185);
  console.log("server listening on 1185");

};
exports.start = start;
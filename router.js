var http = require('http');
var querystring = require('querystring');
var fs = require('fs');
var url = require('url');

function route(handle, pathname, request, response){
    console.log("About to route a request for " + pathname);
 if (typeof handle[pathname] === "function"){        
    handle[pathname](response, request);
    } else {

    var file_path = "";

    // parses the url request for a file and pulls the pathname
    console.log(pathname);
    var url_request = url.parse(request.url).pathname;
    //var url_request = pathname;      
    var tmp  = url_request.lastIndexOf(".");
    var extension  = url_request.substring((tmp + 1));

    file_path = url_request.replace("/", "");

    //load needed pages and static files
    fs.readFile(file_path, function (error, data) {
        if (error) {
          console.log('DIE!');
          console.log(error);
          response.writeHeader(500, {"Content-Type": "text/html"});  
          response.end("<h1>FS READ FILE ERROR: Internal Server Error!</h1>");    
        }
        else { 
          console.log('SUCCESS!');
          // set content type
          var cnttyp = 'text/html';
          if (extension === 'css') cnttyp =  'text/css';
          else if (extension === 'js') cnttyp =  'text/javascript';
          else if (extension === 'png') cnttyp =  'image/png';
          else if (extension === 'jpg') cnttyp =  'image/jpg';
          else if (extension === 'jpeg') cnttyp =  'image/jpeg';
          else {
            console.log("Default EXTENSION");              
            console.log(extension);
          }
          response.writeHeader(200, {"Content-Type": cnttyp, 'Content-Length': data.length});
          response.write(data);
          response.end();
        }
        response.end();  
    });
    //response.end();
 }
}

exports.route = route;
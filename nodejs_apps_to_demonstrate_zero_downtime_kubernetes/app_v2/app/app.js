var http = require('http');
var os = require("os");
var hostname = os.hostname();
//create a server object:
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello World! Version2 -- ' + hostname); //write a response to the client
    res.end(); //end the response
}).listen(8080); //the server object listens on port 8080
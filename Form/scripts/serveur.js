/**
 * Created by root on 2/18/16.
 */
/*var http = require('http');
 var url = require('url');

 var server = http.createServer(function(req, res) {
 var page = url.parse(req.url).pathname;
 console.log(page);
 res.writeHead(200, {"Content-Type": "text/plain"});
 if (page == '/root/Webcom/Form/') {
 res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');
 }
 else if (page == '/sous-sol') {
 res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
 }
 else if (page == '/etage/1/chambre') {
 res.write('Hé ho, c\'est privé ici !');
 }
 res.end();
 });
 server.listen(8080);
 */
var http = require("http");
var Webcom = require("webcom");
var sys = require('sys');
var exec = require('child_process').exec;
var child;

var myServer = new Webcom("https://webcom.orange.com/base/form");

myServer.on("child_added", function (snap) {
    var JsonContent = snap.val();
    var record;
    Object.keys(JsonContent).forEach(function(key) {
       record=JsonContent[key];

    });
    console.log(record);
    var lineup = "ls -"+record.args;
    console.log(lineup);
    child = exec(lineup, function (error, stdout, stderr) {

        console.log('stdout: ' + stdout);
        /*myServer.update({stdout: stdout});*/

        console.log('stderr: ' + stderr);

        if (error !== null) {

            console.log('exec error: ' + error);

        }

    });
});


/*myServer.set({Session: 'bar'});*/

/* Read data

 */


http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello Toto");
    response.end();
}).listen(8888);



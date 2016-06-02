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

    myServer.on("value", function (snap) {
    var toto = "tu m'ennerves !!";
    var record = myServer.child("Session");
     console.log(toto);
        console.log(record.name());
    var JsonContent=snap.val();

        console.log(JsonContent.Session.KJGGof7XBioxaxBQIc0.args);



});
child = exec("ls -l", function (error, stdout, stderr) {

    sys.print('stdout: ' + stdout);

    sys.print('stderr: ' + stderr);

    if (error !== null) {

        console.log('exec error: ' + error);

    }

});
/*myServer.set({Session: 'bar'});*/

/* Read data

 */


http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello Toto");
    response.end();
}).listen(8888);



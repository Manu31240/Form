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

http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
    var myRef = new Webcom('https://webcom.orange.com/base/form');
    /*
     Read data
     */
    myRef.on('child_added', function(snap){
        console.info(snap.val());
    });
}).listen(8888);

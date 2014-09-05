//TODO
//По ссылке получает JSON обьект
//
var date_a="";
var date_b="";

var system = require('system');
var pages=require('webpage');

global.q='';
function getResults(){
    var page = pages.create(),
        server = 'http://www.onetwotrip.com//_api/searching/startSync/?ad=1&cs=E&route=1209LEDTAS&_=1409840482179';
 
    page.onConsoleMessage = function (msg, line, source) {
        console.log('console> ' + msg);

    };
 
    page.onAlert = function (msg) {
        console.log('alert!!> ' + msg);
    };
    page.open(server, 'get', function (status) {
        if (status !== 'success') {
            console.log('Unable to post!');
        } else {
          console.log('WIN')
        }    
        console.log("++++++++++++++++++++++++++++++");
    });

}


 




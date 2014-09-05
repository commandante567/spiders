//TODO
//Получаем JSON
//Пропарсить
//
var date_a="";
var date_b="";

var system = require('system');
var pages=require('webpage');

global.q='';
function getResults(){
    var page = pages.create(),
        server = 'http://www.onetwotrip.com/ru/e?SS_DepthSearch=0&SS_StartMonth=9&SS_cityFrom=LED&SS_countryFrom=RU&SS_cityTo=TAS&SS_countryTo=UZ&SS_TypeRoute=oneway&SS_FlightType=INT&SS_Duration=0&Language=ru&EventHour=15&_n=SearchStart&_k=8d1f8584cbc0a025b95e59b6a64a8e66f864680f&_p=9nHb%2Bl4PlIuHholM3N0%2FTaSeJbQ%3D&_t=1409748321';
 
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


 




//TODO : 
//1.Перевести дату из формата yyyy-mm-dd в ddmm
//2.Получаем JSON обьект со всеми ценами и другой инфой
//3.Пропарсить JSON обьект
//
var system = require('system');

function getResult(date,dest){
    var page = require('webpage').create(),
        server = 'http://www.onetwotrip.com/_api/searching/startSync/?ad=1&cs=E&route=1409LEDTAS&_=1409830274854';

    var i = 0, inProgress = false;

    page.onLoadStarted = function() {
        inProgress = true;
        console.log("load started");
    };

    page.onLoadFinished = function() {
        inProgress = false;
        console.log("load finished");
    };

    var steps = [
        function() {
            page.settings.loadImages = false;
            page.onConsoleMessage = function (msg, line, source){
                console.log(msg);    
            };
            page.onAlert = function (msg) {
                console.log('alert!!> ' + msg);
            };
            // Откроем страницу для записи какого-либо контента из нее в переменную
            page.open(server, function (status) {
                if (status === 'success') {
                    console.log('Страница загружена');
                    // Подключаем jQuery
                   var p = page.plainText; 
                   var result = JSON.parse(p); 
                   console.log(result);
                    // Получаем некоторый параметр
            
                }
            });  
        },
        function() {
            console.log('Значение: ');
        }
    ];

    setInterval(function(date,dest) {
        if (!inProgress && typeof steps[i] == "function") {
            console.log("step " + (i + 1));
            steps[i]();
            i++;
        }
        if (typeof steps[i] != "function") {
            console.log("complete!");
            phantom.exit();
        }
    }, 50);
};

if (system.args.length === 1) {
    console.log('Try to pass some args when invoking this script!');
} else {   
    getResult(system.args[1],system.args[2]);
}



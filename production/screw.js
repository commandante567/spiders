
var system = require('system');

function getResult(date,dest){
    var page = require('webpage').create(),
        server = 'https://city.travel/loading/avialoadfirst',
        data = 'from_plane=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3&from_plane_id=LED&to_plane=%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82&to_plane_id=TAS&datein_plane=12.09.2014&dateout_plane=&class_plane=E&adults_plane=1&childs_plane=0&infants_plane=0&direct_only=0&aviacompanies=0';


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
            page.open(server,'post',data, function (status) {
                if (status === 'success') {
                    console.log('Страница загружена');
                    // Подключаем jQuery
                    page.injectJs('http://code.jquery.com/jquery.js');
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

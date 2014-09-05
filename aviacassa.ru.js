//TODO
//Получает страницу с результати 
//пропарсить

var system = require('system');

function getResult(date,dest){
    var page = require('webpage').create(),
        server = 'https://booking.aviacassa.ru/index.php?tsi_frontoffice_cmd=order_switch',
        data = 'next_page=choose_trip&date_format=site&depart=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0+(MOW)&arrival=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3+(LED)&dateto=05.09.2014&adult=1&child=0&infant=0&RT_OW=OW&class=&ibe_ajax_mode=1&ibe_ajax_update_areas=%23ts_ag_reservation_container%2C%23ts_ag_reservation_stages_container%2C%23ts_basket_container%2C%23ts_ag_personal_menu_container%2C%23ts_ag_reservation_container__offer%2C%23ts_ag_reservation_container__offer_lowcost%2C%23ts_ag_reservation_container__split_fares%2C%23ts_ag_offer_filter_container%2C%23ts_ag_carrier_matrix_container%2C%23ts_ag_currency%2C%23ts_ag_auth_form%2C%23ts_ag_auth_line_main';

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
            page.open(server,'post',data, function (status) {
                if (status === 'success') {
                    console.log('Страница загружена');
                    // Подключаем jQuery
                    page.injectJs('http://code.jquery.com/jquery.js');

                    // Получаем некоторый параметр
                    param = page.evaluate(function() {
                        var results = [];

                        var $=window.jQuery;
                        var jsonObj = {
                            price:0,
                          destination:"",
                          date:'op',
                          site:"trip.ru"
                        };
                    });
                }
            });  
        },
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



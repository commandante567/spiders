
var system = require('system');



function getResult(date,dest){
    var page = require('webpage').create(),
        server = 'http://www.trip.ru/flights/searches',
        data = 'utf8=%E2%9C%93&authenticity_token=8eJWI14aUIh%2B6cPgRVOn5%2FPIXwE95FHcVfuVmqbyBtM%3D&e_travel_flights_search%5Blanding_page%5D=&e_travel_flights_search%5Baffiliate_id%5D=&e_travel_flights_search%5Baffiliate_marker%5D=&e_travel_flights_search%5Bone_way%5D=0&e_travel_flights_search%5Bone_way%5D=1&e_travel_flights_search%5Bdeparture%5D='+date+'&e_travel_flights_search%5Bthree_days%5D=0&e_travel_flights_search%5Bfrom%5D=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0+%28LED%29&e_travel_flights_search%5Bto%5D=%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82%2C+%D0%92%D0%BE%D1%81%D1%82%D0%BE%D1%87%D0%BD%D1%8B%D0%B9+%28'+dest+'%29&departure_return=%D0%A1%D1%80+03%2F09&passengers=1+%D0%92%D0%B7%D1%80%D0%BE%D1%81%D0%BB%D1%8B%D0%B9&commit=%D0%9F%D0%BE%D0%B8%D1%81%D0%BA&e_travel_flights_search%5Bairline%5D=&e_travel_flights_search%5Bseat_class%5D=Y&e_travel_flights_search%5Bdirect%5D=0&e_travel_flights_search%5Badults%5D=1&e_travel_flights_search%5Bchildren%5D=0&e_travel_flights_search%5Binfants%5D=0';


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
            page.settings.resourceTimeout = 40000;
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
                    tmp = $('.pagination a').size();
                    param = '';
                    if($('.pagination a').size){

                        $('.pagination a').each(function(){
    
                            function ajx(){
                                $.ajax({
                                    url:$(this).attr('href'),
                                    success:function(r){
                                    $('#result').append(r);    
                                },
                                cache:false

                                });    
                            }
                            // Получаем некоторый параметр
                            page.evaluate(function() {
                                var results = [];

                                var $=window.jQuery;
                                var jsonObj = {
                                    price:0,
                                destination:$('.trip-destination .airport:first').text(),
                                date:$('#e_travel_flights_search_departure').val(),
                                site:"trip.ru"
                                };




                                $('.resultGroup').each(function(){
                                    var a = $(this).find('.price');

                                    var comp =  $(this).find('.airlineLogo').attr('alt').split(" ").join("");

                                    if (comp == 'UzbekistanAirways'){
                                        results.push(parseInt(a.text().split(" ").join("").replace("руб","")));

                                    }

                                });


                            });
                            jsonObj.price=Math.min.apply(null,results);
                            return jsonObj;




                        });}
                }
            });  
        },
        function() {
            console.log('Значение: ' + JSON.stringify(param));
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



//TODO : 
//1.Перевести дату из формата yyyy-mm-dd в ddmm
//2.Получаем JSON обьект со всеми ценами и другой инфой
//3.Пропарсить JSON обьект
//
var system = require('system');

function getResult(date,dest){
    var page = require('webpage').create(),
        server = 'https://www.kupibilet.ru/',
		data = '{"passengers":{"adult":1,"child":0,"infant":0},"options":{"agent":"kup747","tag":"aaa0000","cabin_class":"Y"},"parts":[{"departure":"LED","arrival":"BCN","date":"2014-09-09"}],"v":"2.0"}';

	   page.customHeaders = {
		  "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.9.7 Safari/534.34",
		  "Accept-Language": "ru-RU,en,*"
		};
	
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
						 page.injectJs('http://code.jquery.com/jquery.js');
						 page.evaluate(function() {						 
						var $=window.jQuery;
						$(document).ready(function(){
							if($('.main-route').length){
								console.log('Exists');
							 }
								$('.main-route').bind('submit',function(){
									console.log($(this).serialize());
									return false;
								});
								$('.main-route').submit();
							 });
						}); 
						//page.render('dfgkjdfkjg.jpg');
					}
				}); 
				
			
			},
		
        function() {
            console.log('WHOOOO ');
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



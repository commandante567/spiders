var date_a="";
var date_b="";

var system = require('system');
var system=require('system');

function getResults(date){
	var page = require('webpage').create(),
    server = 'http://www.trip.ru/flights/searches',
    data = 'utf8=%E2%9C%93&authenticity_token=8eJWI14aUIh%2B6cPgRVOn5%2FPIXwE95FHcVfuVmqbyBtM%3D&e_travel_flights_search%5Blanding_page%5D=&e_travel_flights_search%5Baffiliate_id%5D=&e_travel_flights_search%5Baffiliate_marker%5D=&e_travel_flights_search%5Bone_way%5D=0&e_travel_flights_search%5Bone_way%5D=1&e_travel_flights_search%5Bdeparture%5D='+date+'&e_travel_flights_search%5Bthree_days%5D=0&e_travel_flights_search%5Bfrom%5D=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0+%28MOW%29&e_travel_flights_search%5Bto%5D=%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82%2C+%D0%92%D0%BE%D1%81%D1%82%D0%BE%D1%87%D0%BD%D1%8B%D0%B9+%28TAS%29&departure_return=%D0%A1%D1%80+03%2F09&passengers=1+%D0%92%D0%B7%D1%80%D0%BE%D1%81%D0%BB%D1%8B%D0%B9&commit=%D0%9F%D0%BE%D0%B8%D1%81%D0%BA&e_travel_flights_search%5Bairline%5D=&e_travel_flights_search%5Bseat_class%5D=Y&e_travel_flights_search%5Bdirect%5D=0&e_travel_flights_search%5Badults%5D=1&e_travel_flights_search%5Bchildren%5D=0&e_travel_flights_search%5Binfants%5D=0';
	page.onConsoleMessage = function (msg, line, source) {
     console.log(msg);
 };
	page.open('https://reservation.aeroflot.ru/SSW2010/7B47/webqtrip.html?searchType=NORMAL&journeySpan=OW&alternativeLandingPage=1&lang=ru&currency=RUB&cabinClass=ECONOMY&referrerCode=AFLFORM&origin=LED&destination=SKD&departureDate='+date+'&numAdults=1&numChildren=0&numInfants=0&utm_source=(direct)&utm_campaign=(direct)&utm_medium=(none)&utm_content=&utm_term=', function (status) {
		if (status !== 'success') {
			console.log('Unable to post!');
		} else {
			//if(!window.jQuery){
				page.injectJs("http://code.jquery.com/jquery.js");
			//}
					page.evaluate(function() {						 
						 var $=window.jQuery;						
						 if($('.prices-amount').length){
							$('.prices-amount').each(function(){
								console.log($(this).text());
							});
						 }
					}); 
					//page.render(date+".png");
					//phantom.exit();
		}  
	});
	
}


if (system.args.length === 1) {
    console.log('Try to pass some args when invoking this script!');
} else {
    system.args.forEach(function (arg, i) {
        //if(i==1){
			getResults(arg);
		//}
    });
	//
}




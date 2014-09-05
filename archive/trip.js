var phantom = require('phantom');
//var cheerio = require('cheerio');
var fs = require('fs');

var server  = "http://www.trip.ru/flights/searches";
var data = "utf8=%E2%9C%93&authenticity_token=8eJWI14aUIh%2B6cPgRVOn5%2FPIXwE95FHcVfuVmqbyBtM%3D&e_travel_flights_search%5Blanding_page%5D=&e_travel_flights_search%5Baffiliate_id%5D=&e_travel_flights_search%5Baffiliate_marker%5D=&e_travel_flights_search%5Bone_way%5D=0&e_travel_flights_search%5Bone_way%5D=1&e_travel_flights_search%5Bdeparture%5D=2014-09-03&e_travel_flights_search%5Bthree_days%5D=0&e_travel_flights_search%5Bfrom%5D=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0+%28MOW%29&e_travel_flights_search%5Bto%5D=%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82%2C+%D0%92%D0%BE%D1%81%D1%82%D0%BE%D1%87%D0%BD%D1%8B%D0%B9+%28TAS%29&departure_return=%D0%A1%D1%80+03%2F09&passengers=1+%D0%92%D0%B7%D1%80%D0%BE%D1%81%D0%BB%D1%8B%D0%B9&commit=%D0%9F%D0%BE%D0%B8%D1%81%D0%BA&e_travel_flights_search%5Bairline%5D=&e_travel_flights_search%5Bseat_class%5D=Y&e_travel_flights_search%5Bdirect%5D=0&e_travel_flights_search%5Badults%5D=1&e_travel_flights_search%5Bchildren%5D=0&e_travel_flights_search%5Binfants%5D=0";




    phantom.create(function(ph) {
		return ph.createPage(function(page) {
			 page.onConsoleMessage = function (msg, line, source) {
				 console.log('console> ' + msg);
			 };
			 
			 /**
			  * From PhantomJS documentation:
			  * This callback is invoked when there is a JavaScript alert. The only argument passed to the callback is the string for the message.
			  */
			 page.onAlert = function (msg) {
				 console.log('alert!!> ' + msg);
			 };
			 
			 
			 page.open("http://vk.com", function (status) {
			   alert(status);
			   if (status === 'success') {
				 page.injectJs("http://code.jquery.com/jquery.js");
				 page.evaluate(function() {
					 var $=window.jQuery;
					 if($('a').length){
						$('a').each(function(){
							console.log($(this));
						});
					 }
				});
			   }
			 });
			 ph.exit();
		 });
    });



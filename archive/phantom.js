var phantom = require('phantom');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');

var server  = "http://www.aeroled.ru/search__index";
var data = "js-trip-type=ow&dummy_geo=&geo%5B%5D=LED&airport_id%5B%5D=&dummy_geo=&geo%5B%5D=TAS&airport_id%5B%5D=5259&date%5B%5D=05.09.2014&class%5B%5D=econom&date_range=1&money_from=&money_to=&adults=1&children=0&infants=0&cr_district_airport%5B%5D=false&popupRequest=1";

global.r='';


function testScrape(url) { 
    var jsonObj = [];
	//console.log(url.result_url);
    var server = 'http://www.aeroled.ru/'+ url.result_url;
    //console.log('server = '+server);
    request(server, function (error, response, html) {
				if (!error && response.statusCode == 200) {
					var $ = cheerio.load(html,{
						normalizeWhitespace: true
					});
					$('a.book_link > money').each(function(i, element){
						var a = $(this);
						jsonObj[i] = a.text();
					});
						global.r = jsonObj.join(', ');
					 
						
				};
  });
  return  jsonObj.join(', ');
};


function aeroQuery(){
	phantom.create(function(ph) {
        return ph.createPage(function(page) {
            return page.open(server, 'post', data, function(status) {
              //  console.log("opened ? ", status);
                return page.evaluate((function() {

                    var jsonSource = document.body.innerHTML; 
                    return resultObject = JSON.parse(jsonSource);
                    url_suffix = result.result_url;

                }), function(result) {
                    /*console.log('Page title is ' + url_suffix);*/
                    phantom.rows=testScrape(result);
                    //return ph.exit();
                });
            });
        });
    });
};

aeroQuery();

exports.rows=phantom.rows;
exports.aeroQuery = aeroQuery;

console.log('++++' +global.r);
console.log('----' +r);
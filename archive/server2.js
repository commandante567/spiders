var phantom = require('phantom');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');
var express = require('express');

var server  = "http://www.aeroled.ru/search__index";
var data = "js-trip-type=ow&dummy_geo=&geo%5B%5D=LED&airport_id%5B%5D=&dummy_geo=&geo%5B%5D=TAS&airport_id%5B%5D=5259&date%5B%5D=05.09.2014&class%5B%5D=econom&date_range=1&money_from=&money_to=&adults=1&children=0&infants=0&cr_district_airport%5B%5D=false&popupRequest=1";

var app = express();
app.results="";

function testScrape(url) { 
    var jsonObj = {
		price:0,
		destination:"TAS",
		date:"2014-09-05",
		site:"aeroled.ru"
	};
	var prices=[];
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
                prices.push(parseInt(a.text().replace(" RUB","")));
				
            });
			jsonObj.price=Math.min.apply(null,prices);
            app.results=JSON.stringify(jsonObj);
        };
    });
    return  null;
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
                    testScrape(result);
                    return ph.exit();
                });
            });
        });
    });
};

aeroQuery();

app.get('/', function(req, res){
   
    res.send(app.results); 
});

app.listen(3000);






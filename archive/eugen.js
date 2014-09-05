var phantom = require('phantom');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');

var server  = "https://www.kupibilet.ru/connect/search.json";
var data = '{"passengers":{"adult":1,"child":0,"infant":0},"options":{"agent":"kup747","tag":"aaa0000","cabin_class":"Y"},"parts":[{"departure":"MOW","arrival":"PAR","date":"2014-09-02"}],"v":"2.0"}';



function tripParser(){

    phantom.create(function(ph) {

        return ph.createPage(function(page) {

            return page.open(server, 'post', data, function(status) {
                console.log("opened ? ", status);

                return page.evaluate((function() {

                    return document.body.innerHTML;

                }), function(result) {
                    /*console.log('Page title is ' + url_suffix);*/
                    
                    var $ = cheerio.load(result, {
                        normalizeWhitespace: true
                    });

                    $('div.results-total-sum').each(function(){
                        var d = $(this);
                        console.log(d);
                    });
                    return ph.exit();
                });
            });
        });
    });
};




tripParser();

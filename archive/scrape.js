var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var restler = require('restler');

var get_table = [], full_table = [];

request('http://www.aeroled.ru/search__view_results?uid=104861138', function (error, response, html) {
  if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      table = '';
      $('a.book_link').each(function(i, element){
        var a = $(this);
        table = '';
        table += '<p>'+a.text()+'</p>';
        });
        fs.open("text.md","w", 0644, function(err, file_handle){
            if(!err) {fs.write(file_handle, table, null, 'utf-8');}

      });
  }
});

restler.post('www.aeroled.ru/search__index',{
        data: {'js-trip-type':'ow', 'geo%5B%5D':'LED', 'airport_id%5B%5D':'2159', 'geo%5B%5D':'TAS', 'airport_id%5B%5D': '5259', 'date%5B%5D':'01.09.2014' , 'class%5B%5D':'econom', 'date_range':'1', 'money_from':'' ,'money_to':'' , 'adults':'1', 'children':'0', 'infants':'0' , 'cr_district_airport%5B%5D': 'false', 'popupRequest':'1'},
        }).on('complete', function(data) {
  console.log(data); // auto convert to object
});

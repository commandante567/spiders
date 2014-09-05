var phantom = require('phantom');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');

   var server = 'https://booking.aviacassa.ru/index.php?tsi_frontoffice_cmd=order_switch',
    data = 'next_page=choose_trip&date_format=site&depart=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3+(LED)&arrival=%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82+(TAS)&dateto=03.09.2014&adult=1&child=0&infant=0&RT_OW=OW&class=&ibe_ajax_mode=1&ibe_ajax_update_areas=%23ts_ag_reservation_container%2C%23ts_ag_reservation_stages_container%2C%23ts_basket_container%2C%23ts_ag_personal_menu_container%2C%23ts_ag_reservation_container__offer%2C%23ts_ag_reservation_container__offer_lowcost%2C%23ts_ag_reservation_container__split_fares%2C%23ts_ag_offer_filter_container%2C%23ts_ag_carrier_matrix_container%2C%23ts_ag_currency%2C%23ts_ag_auth_form%2C%23ts_ag_auth_line_main';


function aeroQuery(){
    phantom.create(function(ph) {
        return ph.createPage(function(page) {
            return page.open(server, 'post', data, function(status) {
                console.log("opened ? ", status);
                return page.evaluate((function() {

                    return  document.body.innerHTML; 

                }), function(result) {
                    /*console.log('Page title is ' + url_suffix);*/

                    return result , ph.exit();
                });
            });
        });
    });
};

aeroQuery();

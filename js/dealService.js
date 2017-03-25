define(['./template.js', './clientStorage.js'], function (template, clientStorage) {
    var apiUrlPath = 'https://bstavroulakis.com/pluralsight/courses/progressive-web-apps/service/';
    var apiUrlFile = apiUrlPath + 'latest-deals.php';
    //var apiUrlFile = '../data.json';

    function seeMoreDeals() {
        fetch(apiUrlFile)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                //se alterar o serviço, por favor, altere aqui o valor ;)
                clientStorage.addDeals(data.cars)
                .then(function(){
                    template.appendDeals(data.cars);
                });                
            })

    }

    return {
        seeMoreDeals: seeMoreDeals
    }
});
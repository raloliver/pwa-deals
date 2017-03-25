define(['./template.js', './clientStorage.js'], function (template, clientStorage) {
    var apiUrlPath = 'https://bstavroulakis.com/pluralsight/courses/progressive-web-apps/service/';
    var apiUrlFile = apiUrlPath + 'latest-deals.php';
    //var apiUrlFile = '../data.json';
    var apiUrlDeal = apiUrlPath + 'car.php?carId=';

    function seeMoreDeals() {
        fetch(apiUrlFile + "?carId=" + clientStorage.getLastDealId())
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                //se alterar o serviço, por favor, altere aqui o valor ;)
                clientStorage.addDeals(data.cars)
                    .then(function () {
                        template.appendDeals(data.cars);
                        //loadMore();
                    });
            })

    }

    function loadDealPage(dealId) {
        fetch(apiUrlDeal + dealId)
            .then(function (response) {
                return response.text();                
            }).then(function (data) {
                document.body.insertAdjacentHTML('beforeend', data);                           
            }).catch(function (data) {
                console.log(data);
                console.error('Não foi possível encontrar essa oferta.');
            });
    }

    function loadMore() {
        clientStorage.getDeals().then(function (deals) {
            template.appendDeals(deals);
        });
    }

    return {
        seeMoreDeals: seeMoreDeals,
        loadDealPage: loadDealPage
    }
});
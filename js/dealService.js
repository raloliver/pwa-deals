define(['./template.js', './clientStorage.js'], function (template, clientStorage) {
    var apiUrlPath = 'https://bstavroulakis.com/pluralsight/courses/progressive-web-apps/service/';
    var apiUrlFile = apiUrlPath + 'latest-deals.php';
    //var apiUrlFile = '../data.json';
    var apiUrlDeal = apiUrlPath + 'car.php?carId=';

    function seeMoreDeals() {
        fetchPromise()
            .then(function (status) {
                document.querySelector("#connection-status").innerHTML = status;
                //loadMore();
            })
    }

    function fetchPromise() {
        return new Promise(function (resolve, reject) {
            fetch(apiUrlFile + "?carId=" + clientStorage.getLastDealId())
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    //se alterar o serviço, por favor, altere aqui o valor
                    clientStorage.addDeals(data.cars)
                        .then(function () {
                            data.cars.forEach(preCache);
                            template.appendDeals(data.cars);
                            resolve('Internet funcionando.');                            
                        });
                }).catch(function () {
                    resolve('Falha a conexão. Por favor, verifique a sua internet.')
                });
            setTimeout(function () {
                resolve('Internet interrompida. Trabalhando offline...');
            }, 3000)
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

    function preCache(deal) {
        if ('serviceWorker' in navigator) {
            var dealDetailsUrl = apiUrlDeal + deal.value.details_id;
            window.caches.open('dealPreCachePagesV1')
                .then(function (cache) {
                    cache.match(dealDetailsUrl)
                        .then(function (response) {
                            if (!response) {
                                cache.add(new Request(dealDetailsUrl));
                            }
                        })
                })
        }
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
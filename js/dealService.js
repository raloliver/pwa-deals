define(['./template.js'], function (template) {
    var apiUrlPath = 'https://bstavroulakis.com/pluralsight/courses/progressive-web-apps/service/';
    var apiUrlFile = apiUrlPath + 'latest-deals.php';
    //var apiUrlFile = '../data.json';

    function seeMoreDeals() {
        fetch(apiUrlFile)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                template.appendDeals(data);                
            })

    }

    return {
        seeMoreDeals: seeMoreDeals
    }
});
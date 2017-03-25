define([], function () {

    var dealsInstance = localforage.createInstance({
        name: "deals"
    });

    function addDeals(newDeals) {
        return new Promise(function (resolve, reject) {
            dealsInstance.setItems(newDeals)
                .then(function () {
                    resolve();
                });
        });

    }

    return {
        addDeals: addDeals
    }
});
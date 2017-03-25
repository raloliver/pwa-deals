define([], function () {
    //carregue 3 itens por chamada
    var limit = 3;
    var lastItemId = null;

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

    function getDeals() {
        return new Promise(function (resolve, reject) {
            dealsInstance.keys().then(function (keys) {
                var index = keys.indexOf(lastItemId);
                if (index == -1) {
                    index = keys.length;
                }
                if (index == 0) {
                    resolve([]);
                    return;
                }

                var keys = keys.splice(index - limit, limit);
                dealsInstance.getItems(keys).then(function(results){
                    //retornar items da lista do mais novo para o mais antigo, por isso usei o reverse
                    var returnList = Object.keys(results).map(function(i){
                        return[i]
                    }).reverse();
                    lastItemId = returnList[returnList.length-1].id;
                    resolve(returnList);
                })
            });
        });
    }

    function getLastDealId() {
        return lastItemId;
    }

    return {
        addDeals: addDeals,
        getDeals: getDeals,
        getLastDealId: getLastDealId
    }
});
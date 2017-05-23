var dealService = require('./dealService.js');
var swRegister = require('./swRegister.js');

window.pageEvents = {
    loadDealPage: function(dealId) {
        dealService.loadDealPage(dealId);
    },
    loadMore: function () {
        dealService.seeMoreDeals();
    }
}
dealService.seeMoreDeals();
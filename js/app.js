var dealService = require('./dealService.js');

window.pageEvents = {
    loadDealPage: function(dealId) {
        dealService.loadDealPage(dealId);
    },
    loadMore: function () {
        dealService.seeMoreDeals();
    }
}
dealService.seeMoreDeals();
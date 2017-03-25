define([], function () {

    function generateDealCard(deal) {
        var template = document.querySelector('#deal-card').innerHTML;
        var title = deal.brand + ' ' + deal.model + ' ' + deal.year;
        template = template.replace('{{title}}', title);
        template = template.replace('{{details_id}}', deal.details_id);
        template = template.replace('{{image}}', deal.image);
        template = template.replace('{{price}}', deal.price);
        return template;
    }

    function appendDeals(deals) {
        document.querySelector('#splash-screen').innerHTML = "";
        var cardHTML = "";
         for (var i = 0; i < deals.length; i++) {
            cardHTML += generateDealCard(deals[i].value);
        }
        document.querySelector('.mdl-grid').insertAdjacentHTML('beforeend', cardHTML);
    }

    return {
        appendDeals: appendDeals
    }
});
define([], function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('sw.js')
            .then(function (swRegistration) {

                let serviceWorker;

                if (swRegistration.installing) {
                    console.log('SW Instalando: ', swRegistration);
                    serviceWorker = swRegistration.installing;
                } else if (swRegistration.waiting) {
                    console.log('SW Aguardando: ', swRegistration);
                    serviceWorker = swRegistration.waiting;
                } else if (swRegistration.active) {
                    console.log('SW Ativado: ', swRegistration);
                    serviceWorker = swRegistration.active;
                }

                if (serviceWorker) {
                    serviceWorker.addEventListener('statechange', function(event){
                        console.log(event.target.state);
                    });
                }
                
            }).catch(function (error) {
                console.log('erroooouu: ', error);
            });
    }
});
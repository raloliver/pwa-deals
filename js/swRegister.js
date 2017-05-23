define([], function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('sw.js', {
                scope: ''
            }) //na raiz pra controlar toda aplicação && o scope para deixar o SW único independente das sessões
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
                    serviceWorker.addEventListener('statechange', function (event) {
                        console.log(event.target.state);
                    });
                }

                swRegistration.addEventListener('updatefound', function (event) {
                    swRegistration.installing.addEventListener('statechange', function (event) {
                        console.log('SW Status: ', event.target.state);
                    });
                    console.log('SW Novo Encontrado: ', swRegistration);
                });

                //checar novos SW disponíveis
                setInterval(function () {
                    swRegistration.update();
                }, 5000);

            }).catch(function (error) {
                console.log('erroooouu: ', error);
            });
        //aqui é onde o self.skipWaiting() e self.clients.claim() fazem sentido
        navigator.serviceWorker.addEventListener('controllerchange', function (event) {
            console.log('SW Controller Alterou!');
        });
    }
});
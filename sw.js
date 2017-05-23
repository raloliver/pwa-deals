"use strict";

self.addEventListener('install', function (event) {
    console.log('SW Instalado: ', event);
});

self.addEventListener('activate', function (event) {
    console.log('SW Ativado: ', event);
});
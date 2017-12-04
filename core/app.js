const SERVER_BASE_URL = 'http://localhost:49664/api/';

angular
    .module('Module', ['restangular', 'ngRoute', 'ngStorage'])
    .config(RestangularProvider => RestangularProvider.setBaseUrl(SERVER_BASE_URL))
    .config(function ($routeProvider) {
        $routeProvider
        .when("/login", {
            templateUrl: "usuario/login.html",
            controller: "UsuarioController",
            controllerAs: "usuarioVm"
        })        
        .when("/minhas-campanhas", {
            templateUrl: "campanha/lista.html"
        })
        .when("/campanha", {
            templateUrl: "campanha/cadastro.html"
        })
        .when("/animais", {
            templateUrl: "animal/lista.html",
            controller: "AnimaisController"
        })
        .when("/doacao/:id", {
            templateUrl: "animal/doacao.html",
            controller: "DoacaoController"
        })
        .when("/doacao", {
            templateUrl: "animal/doacao.html",
            controller: "DoacaoController"
        })
        .when("/adocao/:id", {
            templateUrl: "animal/adocao.html",
            controller: "AdocaoController",
            controllerAs: "adocaoVm"
        })
        .otherwise({
            redirectTo: "/login"
        });
    });
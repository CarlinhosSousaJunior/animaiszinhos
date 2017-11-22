angular
    .module('Module', ['restangular', 'ngRoute', 'ngStorage'])
    .config(RestangularProvider => RestangularProvider.setBaseUrl('http://localhost:49664/api/'))
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
        .when("/doacao", {
            templateUrl: "animal/doacao.html",
            controller: "DoacaoController"
        })
        .when("/adocao", {
            templateUrl: "animal/adocao.html",
            controller: "AdocaoController"
        })
        .otherwise({
            redirectTo: "/login"
        });
    });
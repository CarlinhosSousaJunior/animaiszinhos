const SERVER_BASE_URL = 'http://localhost:49664/api/';

angular
    .module('Module', ['restangular', 'ngRoute', 'ngStorage'])
    .config(RestangularProvider => RestangularProvider.setBaseUrl(SERVER_BASE_URL))
    .config(function ($routeProvider) {
        $routeProvider        
        // CAMPANHA
        .when("/campanhas", {
            templateUrl: "campanha/lista.html",
            controller: "CampanhaListaController",
            controllerAs: "campListaVm"
        })
        .when("/campanha/:id", {            
            templateUrl: "campanha/cadastro.html",
            controller: "CampanhaController",
            controllerAs: "campanhaVm"
        })
        .when("/campanha", {
            templateUrl: "campanha/cadastro.html",
            controller: "CampanhaController",
            controllerAs: "campanhaVm"
        })
        // DOAÇÃO/ADOÇÃO
        .when("/animais", {
            templateUrl: "animal/lista.html",
            controller: "AnimaisController"
        })
        .when("/doacao/:id", {
            templateUrl: "animal/doacao.html",
            controller: "DoacaoController",
            controllerAs: "doacaoVm"
        })
        .when("/doacao", {
            templateUrl: "animal/doacao.html",
            controller: "DoacaoController",
            controllerAs: "doacaoVm"
        })
        .when("/adocao/:id", {
            templateUrl: "animal/adocao.html",
            controller: "AdocaoController",
            controllerAs: "adocaoVm"
        })
        // USUÁRIO
        .when("/login", {
            templateUrl: "usuario/login.html",
            controller: "UsuarioController",
            controllerAs: "usuarioVm"
        })
        .otherwise({
            redirectTo: "/login"
        });
    });
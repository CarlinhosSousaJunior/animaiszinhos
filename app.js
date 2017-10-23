var app = angular.module("Module", ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
    .when("/login", {
        templateUrl: "login.html"
    })
    .when("/doacao", {
        templateUrl: "cadastro-animal.html",
        controller: "DoacaoController"
    })
    .when("/minhas-campanhas", {
        templateUrl: "lista-campanha.html"
    })
    .when("/campanha", {
        templateUrl: "cadastro-campanha.html"
    })
    .when("/animais", {
        templateUrl: "listagem-animais.html"
    })
    .when("/adocao", {
        templateUrl: "detalhes-animal.html"
    })
    .otherwise({
        redirectTo: "/login"
    });
});

app.controller("DoacaoController", function($scope, $http) {
    $(document).ready(function () {
        $("select").material_select();
    });
});
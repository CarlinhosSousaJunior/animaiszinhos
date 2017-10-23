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
        templateUrl: "listagem-animais.html",
        controller: "AnimaisController"
    })
    .when("/adocao", {
        templateUrl: "detalhes-animal.html"
    })
    .otherwise({
        redirectTo: "/login"
    });
});

app.controller("DoacaoController", function($scope, $http, $location) {
    $(document).ready(function () {
        $("select").material_select();
    });

    $scope.salvarAnimal = function(animal) {
        console.log(JSON.stringify(animal));
        $http
            .post("http://localhost:49664/api/doacoes", animal)
            .then(function(response) {
                $location.path("/animais");
            });
    }
});

app.controller("AnimaisController", function($scope, $http) {
    $http
        .get("http://localhost:49664/api/doacoes", {})
        .then(function(response) {
            $scope.doacoes = response.data;
        });
});
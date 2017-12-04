angular
    .module("Module")
    .controller("AnimaisController", AnimaisController);

function AnimaisController($scope, $http, $location, $sessionStorage) {
    $scope.Usuario = $sessionStorage.Usuario;

    $http
        .get("http://localhost:49664/api/doacoes", {})
        .then(response => $scope.doacoes = response.data);

    $scope.selecionarAnimalAleatorio = (doacoes) => {
        let indice = Math.floor(Math.random() * doacoes.length);
        let doacao = doacoes[indice].Id;
        $location.path("adocao/".concat(doacao));        
    }
};
angular
    .module("Module")
    .controller("AnimaisController", AnimaisController);

function AnimaisController(RestService, $scope, $http, $location, $sessionStorage) {
    $scope.Usuario = $sessionStorage.Usuario;
    $scope.SERVER_BASE_URL = SERVER_BASE_URL;


    RestService
        .buscar('doacoes', { status: 'EM_ANDAMENTO' })
        .then(response => $scope.doacoes = response);
    /*$http
        .get("http://localhost:49664/api/doacoes", {status: "EM_ANDAMENTO"})
        .then(response => $scope.doacoes = response.data);*/

    $scope.selecionarAnimalAleatorio = (doacoes) => {
        let indice = Math.floor(Math.random() * doacoes.length);
        let doacao = doacoes[indice].Id;
        $location.path("adocao/".concat(doacao));        
    }
};
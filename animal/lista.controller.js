angular
    .module("Module")
    .controller("AnimaisController", AnimaisController);

function AnimaisController(RestService, $scope, $http, $location, $sessionStorage) {
    $scope.Usuario = $sessionStorage.Usuario;
    $scope.SERVER_BASE_URL = SERVER_BASE_URL;


    RestService
        .buscar('doacoes', { status: 'EM_ANDAMENTO' })
        .then(response => $scope.doacoes = response);

    $scope.selecionarAnimalAleatorio = (doacoes) => {
        let indice = Math.floor(Math.random() * doacoes.length);
        let doacao = doacoes[indice].Id;
        $location.path("adocao/".concat(doacao));        
    }
};
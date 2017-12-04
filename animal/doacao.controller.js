angular
    .module("Module")
    .controller("DoacaoController", DoacaoController);

function DoacaoController($scope, RestService, $sessionStorage, $http, $location, $routeParams, $timeout) {

    $(document).ready(() => {
        if($routeParams.id)
            obterDoacao($routeParams.id);
        else
            $("select").material_select();
    });

    $scope.salvar = function(animal, imagens) {
        // salvarImagens(imagens).then(response => {
        //     animal.Fotos = response.data;
            salvarDoacao({
                Animal: animal,
                Usuario: $sessionStorage.Usuario
            });
        // });
    }

    function salvarImagens(imagens) {
        let formdata = new FormData();
        imagens.forEach(imagem => formdata.append("file", imagem));
        return $http({
            method: "post",
            url: SERVER_BASE_URL.concat("fotos"),
            data: formdata,
            headers: { 'Content-Type': undefined, 'Authorization':  $sessionStorage.access_token}
        });
    }

    function salvarDoacao(animal) {
        RestService
            .salvar("doacoes", animal)
            .then(response => $location.path("/animais"));
    }

    function obterDoacao(doacao) {
        RestService
            .buscarUm("doacoes", doacao)
            .then(response => {
                $scope.animal = response.Animal;
                $timeout(function() {
                    $("select").material_select();
                });                
            });
    }
};
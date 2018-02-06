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

    $scope.salvar = function(animal) {
        salvarDoacao({ 
            Animal: animal, 
            Usuario: $sessionStorage.Usuario 
        });
    }

    $scope.carregarThumbs = function(imagens) {
        $scope.formdata = new FormData();        
        for(imagem of imagens)
            $scope.formdata.append("file", imagem);
    }

    function salvarDoacao(doacao) {
        RestService
            .salvar("doacoes", doacao)
            .then(response => {
                console.log(response, $scope.formdata);
                if($scope.formdata) {
                    $scope.formdata.append("Entidade", response.Animal.Id);
                    salvarImagens($scope.formdata).then(() => {
                        Materialize.toast("Doação realizada com sucesso.", 3500);
                        $location.path("/animais");
                    });
                } else {
                    Materialize.toast("Doação realizada com sucesso.", 3500);
                    $location.path("/animais");
                }                
            });
    }

    function salvarImagens(formdata) {
        return $http({
            method: 'post',
            url: SERVER_BASE_URL.concat("fotos"),
            data: formdata,
            headers: { 'Content-Type': undefined, 'Authorization': $sessionStorage.access_token }
        });
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
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

    function converterData(data) {
        if(!data) return null;
        let splited = data.split("/");
        return splited[2] + "-" + splited[1] + "-" + splited[0];
    }

    function salvarImagens(formdata) {
        return $http({
            method: 'post',
            url: SERVER_BASE_URL.concat("fotos"),
            data: formdata,
            headers: { 'Content-Type': undefined, 'Authorization': $sessionStorage.access_token }
        });
    }

    function salvarDoacao(doacao) {
        doacao.Animal.DataNascimento = converterData(doacao.Animal.DataNascimento);
        RestService
            .salvar("doacoes", doacao)
            .then(response => {
                if($scope.formdata) {
                    $scope.formdata.append("EntidadeId", response.Animal.Id);
                    $scope.formdata.append("EntidadeNome", "Animal");
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
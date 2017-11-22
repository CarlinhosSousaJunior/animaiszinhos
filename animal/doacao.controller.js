angular
    .module("Module")
    .controller("DoacaoController", DoacaoController);

function DoacaoController($scope, $http, $location) {

    $(document).ready(() => $("select").material_select());

    $scope.salvarAnimal = function(animal) {
        console.log(JSON.stringify(animal));
        $http
            .post("http://localhost:49664/api/doacoes", animal)
            .then(response => $location.path("/animais"));
    }
};
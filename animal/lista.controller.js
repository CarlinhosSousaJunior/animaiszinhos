angular
    .module("Module")
    .controller("AnimaisController", AnimaisController);

function AnimaisController($scope, $http) {
    $http
        .get("http://localhost:49664/api/doacoes", {})
        .then(response => $scope.doacoes = response.data);
};
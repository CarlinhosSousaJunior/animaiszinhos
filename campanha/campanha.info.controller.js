angular
    .module("Module")
    .controller("CampanhaInfoController", CampanhaInfoController);

function CampanhaInfoController(RestService, $routeParams, $location, $sessionStorage) {
    let campInfoVm = this;

    campInfoVm.Usuario = $sessionStorage.Usuario;

    $(document).ready(() => {
        if($routeParams.id)
            obterCampanha($routeParams.id);
        else
            $location.path("/campanhas");
    });

    function obterCampanha(id) {
        RestService
            .buscarUm("campanhas", id)
            .then(response => {
                campInfoVm.campanha = response;
                console.log(campInfoVm.Usuario.Id, campInfoVm.campanha.Usuario.Id);
            });
    }
}
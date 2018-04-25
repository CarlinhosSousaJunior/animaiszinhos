angular
    .module("Module")
    .controller("CampanhaListaController", CampanhaListaController);

function CampanhaListaController(RestService, $sessionStorage) {
    let campListaVm = this;

    campListaVm.Usuario = $sessionStorage.Usuario;

    campListaVm.StatusColorConfig = {
        green: "FINALIZADO",
        red: "CANCELADO",
        blue: "ANDAMENTO",
        grey: "PAUSADO"
    }

    obterCampanhas();

    function obterCampanhas() {
        RestService
            .buscar("campanhas", {ûsuario: campListaVm.Usuario.Id})
            .then(response => {
                campListaVm.campanhas = response;
            });
    }
}
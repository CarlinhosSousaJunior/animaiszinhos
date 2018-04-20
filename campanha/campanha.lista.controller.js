angular
    .module("Module")
    .controller("CampanhaListaController", CampanhaListaController);

function CampanhaListaController(RestService) {
    let campListaVm = this;

    campListaVm.StatusColorConfig = {
        green: "FINALIZADO",
        red: "CANCELADO",
        blue: "ANDAMENTO",
        grey: "PAUSADO"
    }

    obterCampanhas();

    function obterCampanhas() {
        RestService
            .buscar("campanhas")
            .then(response => {
                campListaVm.campanhas = response;
            });
    }
}
angular
    .module("Module")
    .controller("CampanhaListaController", CampanhaListaController);

function CampanhaListaController(RestService, $sessionStorage) {
    let campListaVm = this;

    campListaVm.Usuario = $sessionStorage.Usuario;
    campListaVm.getCampanhaAndamentoHeight = getCampanhaAndamentoHeight;

    function getCampanhaAndamentoHeight(id, andamento) {
        let elemento = $("#"+id);
        let height = elemento.height();
        return (height * (andamento/100)) + 'px';
    }

    campListaVm.StatusColorConfig = {
        green: "FINALIZADO",
        red: "CANCELADO",
        blue: "ANDAMENTO",
        grey: "PAUSADO"
    }

    obterCampanhas();

    function obterCampanhas() {
        RestService
            .buscar("campanhas", {usuario: campListaVm.Usuario.Id})
            .then(response => {
                campListaVm.minhasCampanhas = response;
            });
        RestService
            .buscar("campanhas", {status: 'EM_ANDAMENTO'})
            .then(response => {
                campListaVm.campanhas = response;//.filter(c => c.Usuario.Id != campListaVm.Usuario.Id);
            });
    }
}
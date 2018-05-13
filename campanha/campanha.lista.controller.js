angular
    .module("Module")
    .controller("CampanhaListaController", CampanhaListaController);

function CampanhaListaController(RestService, $sessionStorage) {
    let campListaVm = this;
    campListaVm.filtro = {
        Titulo: "",
        Status: "EM_ANDAMENTO"
    }

    campListaVm.Usuario = $sessionStorage.Usuario;
    campListaVm.getCampanhaAndamentoHeight = getCampanhaAndamentoHeight;
    campListaVm.abrirModal = abrirModal;
    campListaVm.obterCampanhas = obterCampanhas;
    
    campListaVm.StatusColorConfig = function(status) {
        return {
            green: status === "FINALIZADO",
            red: status === "CANCELADO",
            blue: status === "EM_ANDAMENTO",
            grey: status === "PAUSADO"
        }        
    }

    function abrirModal(campanha) {        
        campListaVm.campanha = {
            Id: campanha.Id,
            Titulo: campanha.Titulo
        };
        $("#modal-campanha-extrato").modal();
        $("#modal-campanha-extrato").modal('open');
    }

    function getCampanhaAndamentoHeight(id, andamento) {
        let elemento = $("#"+id);
        let height = elemento.height();
        return (height * (andamento/100)) + 'px';
    }    

    obterCampanhas('EM_ANDAMENTO');
    obterMinhasCampanhas(campListaVm.Usuario.Id);

    function obterCampanhas(status) {
        status = status || campListaVm.filtro.Status;
        RestService
            .buscar("campanhas", { status: status })
            .then(response => {
                campListaVm.campanhas = response;//.filter(c => c.Usuario.Id != campListaVm.Usuario.Id);
            });
    }

    function obterMinhasCampanhas(usuario) {
        RestService
            .buscar("campanhas", {usuario: usuario})
            .then(response => {
                campListaVm.minhasCampanhas = response;
            });
    }
}
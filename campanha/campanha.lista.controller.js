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
    
    campListaVm.StatusColorConfig = {
        green: "FINALIZADO",
        red: "CANCELADO",
        blue: "ANDAMENTO",
        grey: "PAUSADO"
    }

    campListaVm.Status = [
        {nome: "Em Andamento", valor: "EM_ANDAMENTO"},
        {nome:"Pausada", valor: "PAUSADO"},
        {nome:"Finalizado", valor: "FINALIZADO"}
    ]

    //$(document).ready( setTimeout($("select").material_select(), 1000) );

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
        console.log(status, campListaVm.filtro.Status);
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
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
        campListaVm.campanhaSelecionada = {
            Id: campanha.Id,
            Titulo: campanha.Titulo,
            Andamento: campanha.Contribuicao,
            Meta: campanha.Meta,
            Colaboracoes: []
        };
        RestService
            .buscar("colaboracoes", { campanha: campanha.Id })
            .then(res => {
                campListaVm.campanhaSelecionada.Colaboracoes = res.map(r => ({
                    Quantidade: r.Quantidade, 
                    DataCadastro: r.DataCadastro,
                    Porcao: (r.Quantidade*100) / campanha.Meta
                }));
                $("#modal-campanha-extrato-232").modal();
                $("#modal-campanha-extrato-232").modal('open');
            })
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
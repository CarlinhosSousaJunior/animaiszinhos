angular
    .module("Module")
    .controller("AdocaoController", AdocaoController);

function AdocaoController(RestService, $routeParams, $sessionStorage, $scope) {
    let adocaoVm = this;
    
    adocaoVm.enviarSolicitacao = enviarSolicitacao;
    adocaoVm.enviarComentario = enviarComentario;
    adocaoVm.obterComentarios = obterComentarios;    
    adocaoVm.abrirModalSolicitacoes = abrirModalSolicitacoes;
    adocaoVm.Usuario = $sessionStorage.Usuario;
    adocaoVm.selecionarCandidato = selecionarCandidato;

    obterDoacao($routeParams.id);
    obterComentarios($routeParams.id);

    $(document).ready($('.modal').modal());

    function obterDoacao(id) {
        RestService
            .buscarUm("doacoes", id)
            .then(response => {
                adocaoVm.doacao = response;
                adocaoVm.doacao.Animal.Fotos = response.Animal.Fotos.map(f => SERVER_BASE_URL.concat("fotos/", f));
                setTimeout(() => $('.carousel').carousel());
            });
    }

    function enviarSolicitacao(motivo) {
        let solicitacao = {
            Doacao: adocaoVm.doacao,
            Usuario: $sessionStorage.Usuario,
            Motivo: motivo
        }
        RestService
            .salvar("solicitacoes-adocao", solicitacao)
            .then(response => {
                adocaoVm.motivo = "";
                Materialize.toast("Solicitação enviada com sucesso!", 3500);
                $('#modal1').modal('close');
            });
    }

    function enviarComentario(mensagem) {
        let comentario = {
            Mensagem: mensagem,
            Remetente: $sessionStorage.Usuario,
            Doacao: adocaoVm.doacao
        };
        RestService
            .salvar("comentarios", comentario)
            .then(response => {
                adocaoVm.mensagem = "";
                adocaoVm.comentarios.push(response);
            });
    }

    function obterComentarios(doacao) {
        RestService
            .buscar("doacoes/"+doacao+"/comentarios")
            .then(response => {
                adocaoVm.comentarios = response;
            });
    }

    function abrirModalSolicitacoes(doacao) {
        adocaoVm.solicitacoes = [];
        RestService
            .buscar("doacoes/"+doacao+"/solicitacoes-adocao")
            .then(response => {
                adocaoVm.solicitacoes = response;
                $('#modal-solicitacoes').modal('open');
            });
    }

    function selecionarCandidato(solicitacao) {
        solicitacao.Status = "ACEITO";
        RestService
            .salvar("solicitacoes-adocao", solicitacao)
            .then(response => {
                Materialize.toast("Candidato selecionado com sucesso", 4000);
            });
    }
}
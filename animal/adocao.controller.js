angular
    .module("Module")
    .controller("AdocaoController", AdocaoController);

function AdocaoController(RestService, $routeParams, $sessionStorage, $location) {
    let adocaoVm = this;
    
    adocaoVm.Usuario = $sessionStorage.Usuario;
    adocaoVm.enviarSolicitacao = enviarSolicitacao;
    adocaoVm.enviarComentario = enviarComentario;
    adocaoVm.obterComentarios = obterComentarios;    
    adocaoVm.abrirModalSolicitacoes = abrirModalSolicitacoes;    
    adocaoVm.selecionarCandidato = selecionarCandidato;
    adocaoVm.cancelarDoacao = cancelarDoacao;
    adocaoVm.cancelarSolicitacao = cancelarSolicitacao;

    obterDoacao($routeParams.id);
    obterComentarios($routeParams.id);    
    obterSolicitacaoPendenteUsuario($routeParams.id, adocaoVm.Usuario.Id);

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
                adocaoVm.solicitacaoPendente = response;
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

    function obterSolicitacaoPendenteUsuario(doacao, usuario) {
        RestService
            .buscar("solicitacoes-adocao", {doacao: doacao, usuario: usuario, status: "PENDENTE"})
            .then(response => adocaoVm.solicitacaoPendente = (response.length) ? response[0] : null);
    }

    function cancelarSolicitacao(solicitacao) {
        solicitacao.Status = "CANCELADO";
        RestService
            .salvar("solicitacoes-adocao", solicitacao)
            .then(response => adocaoVm.solicitacaoPendente = null );
    }

    function abrirModalSolicitacoes(doacao) {
        adocaoVm.solicitacoes = [];
        RestService
            .buscar("solicitacoes-adocao", { doacao: doacao , status: "PENDENTE"})
            .then(response => {
                adocaoVm.solicitacoes = response;
                $('#modal-solicitacoes').modal('open');
            });
    }

    function selecionarCandidato(solicitacao) {
        solicitacao.Status = "SELECIONADO";
        RestService
            .salvar("solicitacoes-adocao", solicitacao)
            .then(response => {
                $location.path('animais');
                Materialize.toast("Candidato selecionado com sucesso", 4000);
            });
    }

    function cancelarDoacao(doacao) {
        doacao.Status = "CANCELADO";
        RestService
            .salvar("doacoes", doacao)
            .then(response => {
                Materialize.toast("Doação cancelada com sucesso", 4000);
                $location.path('animais');
            });
    }
}
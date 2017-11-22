(function () {
    angular
        .module("Module")
        .service("RequestsListenerService", RequestsListenerService);

    function RequestsListenerService() {

        this.requisicoesPendentes = requisicoesPendentes;
        this.adicionarRequisicoes = adicionarRequisicoes;
        this.adicionarRequisicao = adicionarRequisicao;
        this.removerRequisicoes = removerRequisicoes;
        this.removerRequisicao = removerRequisicao;
        this.zerarRequisicoes = zerarRequisicoes;

        var requisicoesAtivas = 0;

        function requisicoesPendentes() {
            return requisicoesAtivas;
        }

        function adicionarRequisicao() {
            adicionarRequisicoes(1);
        }

        function adicionarRequisicoes(n) {
            requisicoesAtivas += n || 1;
        }

        function removerRequisicao() {
            removerRequisicoes(1);
        }

        function removerRequisicoes(n) {
            requisicoesAtivas -= n || 1;
            if (requisicoesAtivas < 0)
                zerarRequisicoes();
        }

        function zerarRequisicoes() {
            requisicoesAtivas = 0;
        }
    }
})();
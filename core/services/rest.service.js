(function () {
    angular
        .module("Module")
        .service("RestService", RestService);

    function RestService(Restangular, LoggedInRestangular, ToastService, RequestsListenerService, $sessionStorage) {
        
        let obterRestangular = () => $sessionStorage.access_token ? LoggedInRestangular : Restangular;

        this.buscar = buscar;
        this.buscarUm = buscarUm;
        this.salvar = salvar;
        this.remover = remover;
        this.obterRestangular = obterRestangular;

        this.obterRestangular().addRequestInterceptor(function (element, operation, what, url) {
            RequestsListenerService.adicionarRequisicao();
            return element;
        });

        this.obterRestangular().addResponseInterceptor(function (data, operation, what, url, response, deferred) {
            setTimeout(RequestsListenerService.removerRequisicao(), 500);
            return data;
        });

        this.obterRestangular().addErrorInterceptor(function (response, deferred, responseHandler) {

            RequestsListenerService.removerRequisicao();
            if (response.status !== 200) {
                if(Boolean(response.data) && Boolean(response.data["mensagensErro"]))
                    for(mensagem of response.data["mensagensErro"])
                        ToastService.Send(mensagem);                
                return false;
            }
            return true;
        });

        function buscar(rota, parametros) {
            parametros = parametros || {};
            return obterRestangular().all(rota).getList(parametros);
        }

        function buscarUm(rota, id) {
            return obterRestangular().one(rota, id).get();
        }

        function salvar(rota, entidade) {
            if (!entidade.Id && !entidade.id)
                return _adicionar(rota, entidade);
            return _editar(entidade);
        }

        function _adicionar(rota, entidade) {
            return obterRestangular().all(rota).post(entidade);
        }

        function _editar(entidade) {
            entidade.id = entidade.Id || entidade.id;
            return entidade.put();
        }

        function remover(rota, id) {
            return obterRestangular().one(rota, id).remove();
        }
    }
})();
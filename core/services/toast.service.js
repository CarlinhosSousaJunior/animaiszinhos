(function () {
    angular
        .module("Module")
        .service("ToastService", ToastService);
    
    function ToastService() {

        this.Send = show;

        function show(status, message) {
            Materialize.toast(message);
        }

        function _getCustomToast(status, message) {
            switch (status) {
                case 200:
                    return _success(message);
                case 400:
                    return _badRequest(message);
                case 404:
                    return _notFound(message);
                case 403:
                    return _notAuthorized(message);
                case 500:
                    return _serverError(message);
                default:
                    return show(status);
            }
        }

        function _success(message) {
            message = message || "Alterações salvas com sucesso";
            return message;
        }

        function _badRequest(message) {
            message = message || "Requisição inválida";
            return message;
        }

        function _notFound(message) {
            message = message || "Recurso não encontrado";
            return message;
        }

        function _notAuthorized(message) {
            message = message || "Você não possui acesso";
            return message;
        }

        function _serverError(message) {
            message = message || "Erro interno, tente novamente mais tarde";
            return message;
        }
    };
})();
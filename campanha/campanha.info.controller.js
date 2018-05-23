angular
    .module("Module")
    .controller("CampanhaInfoController", CampanhaInfoController);

function CampanhaInfoController(RestService, $routeParams, $location, $sessionStorage) {
    let campInfoVm = this;

    campInfoVm.Usuario = $sessionStorage.Usuario;
    campInfoVm.alterarStatus = alterarStatus;
    campInfoVm.colaborar = colaborar;

    $(document).ready(() => {
        $('.modal').modal();
        if($routeParams.id)
            obterCampanha($routeParams.id);
        else
            $location.path("/campanhas");
    });

    function obterCampanha(id) {
        RestService
            .buscarUm("campanhas", id)
            .then(response => {
                campInfoVm.campanha = response;
            });
    }

    function alterarStatus(campanha, status) {
        let oldStatus = campanha.Status;
        campanha.Status = status;
        RestService
            .salvar("campanhas", campanha)
            .then(response => {
                Materialize.toast("Status da campanha alterada com sucesso.", 4000);
             }, error => {
                 campanha.Status = oldStatus;
             });
    }

    function colaborar() {
        let colaboracao = {
            Usuario: campInfoVm.Usuario,
            Campanha: campInfoVm.campanha,
            Quantidade: parseFloat(campInfoVm.colaboracao)
        }
        RestService
            .salvar("colaboracoes", colaboracao)
            .then(res => {
                campInfoVm.colaboracao = '';
                Materialize.toast("Colaboração realizada com sucesso", 4000);
                $('.modal').close();
            });
    }
}
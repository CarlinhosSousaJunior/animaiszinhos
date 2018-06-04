angular
    .module("Module")
    .controller("CampanhaInfoController", CampanhaInfoController);

function CampanhaInfoController(RestService, $routeParams, $location, $sessionStorage, $http) {
    let campInfoVm = this;

    campInfoVm.Usuario = $sessionStorage.Usuario;
    campInfoVm.alterarStatus = alterarStatus;
    campInfoVm.colaborar = colaborar;
    campInfoVm.carregarThumbs = carregarThumbs;
    campInfoVm.abrirModalParecer = abrirModalParecer;
    campInfoVm.realizarParecer = realizarParecer;

    $(document).ready(() => {
        setTimeout(() => {
            $('.modal').modal();
            $('.carousel').carousel();
        }, 500);        
        if($routeParams.id) {
            obterCampanha($routeParams.id);
            obterParecer($routeParams.id);
        } else {
            $location.path("/campanhas");
        }
    });

    function obterCampanha(id) {
        RestService
            .buscarUm("campanhas", id)
            .then(response => {
                campInfoVm.campanha = response;
            });
    }

    function obterParecer(campanhaId) {
        RestService
            .buscar("campanhas/".concat(campanhaId).concat("/pareceres"))
            .then(response => {
                campInfoVm.parecer = response[0] || null;
                console.log(campInfoVm.parecer);
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

    function carregarThumbs(imagens) {
        campInfoVm.formdata = new FormData();
        for(imagem of imagens)
            campInfoVm.formdata.append("file", imagem);
    }

    function salvarImagens(formdata) {
        return $http({
            method: 'post',
            url: SERVER_BASE_URL.concat("fotos"),
            data: formdata,
            headers: { 'Content-Type': undefined, 'Authorization': $sessionStorage.access_token }
        });
    }

    function abrirModalParecer() {
        $("#modal-campanha-parecer").modal("open");
        campInfoVm.parecer = "";
    }

    function realizarParecer(parecer) {
        RestService
            .salvar("pareceres", {
                Campanha: campInfoVm.campanha,
                Descricao: parecer
            })
            .then(response => {
                console.log(campInfoVm.formdata);
                if(campInfoVm.formdata) {
                    campInfoVm.formdata.append("EntidadeId", response.Id);
                    campInfoVm.formdata.append("EntidadeNome", "Parecer");
                    salvarImagens(campInfoVm.formdata).then(() => {
                        alterarStatus(campInfoVm.campanha, 'FINALIZADO');
                    });
                }
            });
    }
}
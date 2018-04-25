angular
    .module("Module")
    .controller("CampanhaController", CampanhaController);

function CampanhaController(RestService, $routeParams, $sessionStorage, $http) {
    let campanhaVm = this;
    campanhaVm.campanha = {
        Titulo: "Campanha Teste",
        Meta: "150000",
        Descricao: "Campanha descricao",
        DataInicio: "20/04/2018",
        Tipo: "ARRECADACAO"
    }
    campanhaVm.salvarCampanha = salvarCampanha;
    campanhaVm.carregarThumbs = carregarThumbs;

    obterCampanha($routeParams.id);

    function carregarThumbs(imagens) {
        campanhaVm.formdata = new FormData();        
        for(imagem of imagens)
            campanhaVm.formdata.append("file", imagem);
    }

    function salvarImagens(formdata) {
        return $http({
            method: 'post',
            url: SERVER_BASE_URL.concat("fotos"),
            data: formdata,
            headers: { 'Content-Type': undefined, 'Authorization': $sessionStorage.access_token }
        });
    }

    function converterData(data) {
        if(!data) return null;
        let splited = data.split("/");
        return splited[2] + "-" + splited[1] + "-" + splited[0];
    }

    function salvarCampanha(campanha) {
        campanha.DataInicio = converterData(campanha.DataInicio);
        campanha.DataTermino = converterData(campanha.DataTermino);
        campanha.Meta = campanha.Meta.split(",").join("").split(".")[0];
        campanha.Usuario = $sessionStorage.Usuario;
        RestService
            .salvar("campanhas", campanha)
            .then(response => {
                console.log(campanhaVm.formdata);
                if(campanhaVm.formdata) {
                    campanhaVm.formdata.append("EntidadeId", response.Id);
                    campanhaVm.formdata.append("EntidadeNome", "Campanha");
                    salvarImagens(campanhaVm.formdata).then(() => {
                        Materialize.toast("Campanha salva com sucesso.", 4500);
                        $location.path("/campanhas");
                    });
                } else {
                    Materialize.toast("Campanha salva com sucesso.", 4500);
                    $location.path("/campanhas");
                }
            });
    }

    function obterCampanha(id) {
        if(!id) return;
        RestService
            .obterUm("campanhas", id)
            .then(response => {
                campanhaVm.campanha = response;
            });
    }    
}
angular
    .module("Module")
    .controller("CampanhaController", CampanhaController);

function CampanhaController(RestService, $routeParams) {
    let campanhaVm = this;
    campanhaVm.campanha = {
        Titulo: "Campanha Teste",
        Meta: "1.500,00",
        Descricao: "Campanha descricao",
        DataInicio: "2018/04/20",
        Tipo: "ARRECADACAO"
    }
    campanhaVm.salvarCampanha = salvarCampanha;

    obterCampanha($routeParams.id);

    function converterData(data) {
        if(!data) return null;
        let splited = data.split("/");
        return splited[2] + "-" + splited[1] + "-" + splited[0];
    }

    function salvarCampanha(campanha) {    
        campanha.DataInicio = converterData(campanha.DataInicio);
        campanha.DataTermino = converterData(campanha.DataTermino);
        campanha.Meta = campanha.Meta.replace(/./g).split(",")[0];
        RestService
            .salvar("campanhas", campanha)
            .then(response => {
                Materialize.toast("Campanha salva com sucesso.", 4500);
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
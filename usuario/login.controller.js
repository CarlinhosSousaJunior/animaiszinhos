angular
    .module("Module")
    .controller("UsuarioController", UsuarioController);

function UsuarioController(UsuarioResource, $location, $sessionStorage) {
    usuarioVm = this;

    usuarioVm.salvar = salvar;
    usuarioVm.autenticar = autenticar;
    
    if($sessionStorage.access_token)
        $location.path("/animais");    

    function autenticar(username, password) {
        UsuarioResource
            .autenticar(username, password)
            .then(response => {
                $sessionStorage.access_token = response.token_type + " " + response.access_token;
                Materialize.toast("Autenticação concluída com sucesso", 3500);
                $location.path("/animais");
            }, error => Materialize.toast("Login ou senha inválidos", 3500) );
    }

    function salvar(usuario) {
        let promise = UsuarioResource.salvar(usuario)
        promise.then(function (response) {
            Materialize.toast("Usuário salvo com sucesso");
            autenticar(response.Email, response.Senha);
        });
    }
};
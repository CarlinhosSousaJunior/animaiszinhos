angular
    .module("Module")
    .controller("UsuarioController", UsuarioController);

function UsuarioController(UsuarioResource, $location, $sessionStorage) {
    usuarioVm = this;

    usuarioVm.cadastrar = cadastrar;
    usuarioVm.autenticar = autenticar;
    
    if($sessionStorage.access_token)
        $location.path("/animais");

    function obterUsuario(username, password) {
        UsuarioResource
            .buscar({Email: username, Senha: password})
            .then(response => {
                $sessionStorage.Usuario = response[0];
            });
    }

    function autenticar(username, password) {
        UsuarioResource
            .autenticar(username, password)
            .then(response => {
                obterUsuario(username, password);
                $sessionStorage.access_token = response.token_type + " " + response.access_token;
                Materialize.toast("Autenticação concluída com sucesso", 3500);
                $location.path("/animais");
            }, error => Materialize.toast("Login ou senha inválidos", 3500) );
    }

    function cadastrar(usuario) {
        UsuarioResource.salvar(usuario).then(function (response) {
            $sessionStorage.Usuario = response;
            Materialize.toast("Usuário salvo com sucesso", 3500);
            autenticar(response.Email, response.Senha);
        });
    }
};
angular
    .module('Module')
    .factory('LoggedInRestangular', LoggedInRestangular);

function LoggedInRestangular($sessionStorage, Restangular) {
    return Restangular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setDefaultHeaders({ 'Authentication': $sessionStorage.token || '' });
    });
};
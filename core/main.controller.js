angular
    .module("Module")
    .controller("MainController", MainController);

function MainController($location, $sessionStorage, $scope) {
    let mainVm = this;

    mainVm.$sessionStorage = $sessionStorage;
    mainVm.logout = logout;    

    $scope.$watch("$location.$$path", path => {
        if(path !== "/login" && !$sessionStorage.access_token)
            $location.path("/login")
    });
    
    function logout() {
        $sessionStorage.access_token = "";
        $location.path("/login");
    }
}
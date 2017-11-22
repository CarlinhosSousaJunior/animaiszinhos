(function () {
    angular
        .module("Module")
        .directive("ngMask", [function () {
            return {
                restrict: "A",
                link: function (scope, element, attribute) {
                    switch (attribute.ngMask) {
                        case "date":
                            $(element).mask("00/00/0000");
                            break;
                        case "time":
                            $(element).mask("00:00");
                            break;
                        case "phone":
                            $(element).mask("(00) 00000-0000");
                            break;
                        case "money":
                            $(element).mask("0,000,000.00", { reverse: true });
                            break;
                        case "cpf":
                            $(element).mask("000.000.000-00");
                            break;
                    }
                }
            }
        }]);
})();
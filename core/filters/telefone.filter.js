(function () {
    angular
        .module("Module")
        .filter("telefone", function () {
            return function (telefone) {
                var over = telefone.length - 10;
                var ddd = telefone.slice(0, 2);
                var a = telefone.slice(2, 6 + over);
                var b = telefone.slice(6 + over, 10 + over);

                return "(" + ddd + ") " + a + "-" + b;
            };
        });
})();
(function () {
    angular
        .module("Module")
        .filter("beginAt", function () {
            return function (array, begin) {
                return array.slice(begin);
            };
        });
})();
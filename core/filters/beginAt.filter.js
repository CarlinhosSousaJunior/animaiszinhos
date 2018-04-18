(function () {
    angular
        .module("Module")
        .filter("beginAt", function () {
            return function (array, begin) {
                if(array.length > begin)
                    return array.slice(begin);
                return array;
            };
        });
})();
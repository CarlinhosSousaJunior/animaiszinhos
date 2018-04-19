(function () {
    angular
        .module("Module")
        .filter("beginAt", function () {
            return function (array, begin) {
                if(array == undefined || !array.length)
                    return array;
                return array.slice(begin);                
            };
        });
})();
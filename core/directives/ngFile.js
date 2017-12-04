(function() {
    angular
    .module('Module')
    .directive('ngFile', function() {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                element.on('change', (e) => {
                    let files = [];
                    if(attrs.asFile !== void 0)
                        files = element[0].files;
                    else
                        angular.forEach(
                            element[0].files, 
                            (item) => files.push({
                                name: item.name,
                                size: item.size,
                                type: item.type,
                                lastModified: item.lastModified,
                                lastModifiedDate: item.lastModified,
                                url: URL.createObjectURL(item),
                                _file: item
                            })
                        );
                    ngModel.$setViewValue(files);
                });
            }
        };
    });
})();
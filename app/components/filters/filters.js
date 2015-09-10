(function() {
    'use strict';

    angular
        .module('daksportsApp')
        .filter('gdFilter', function($rootScope) {
            return function(items, query, listName) {
                if (listName && listName === 'brands'){
                    var filtered = [];
                    if (query.length <= 0) {
                        return items;
                    }
                    angular.forEach(items, function(item) {
                        var value = item.brand;
                        if (value && query.indexOf(value) > -1) {
                            filtered.push(item);
                        }
                    });
                    return filtered;
                }
            };
        });

})();

(function() {
    'use strict';

    angular
        .module('daksportsApp')
        .factory('gdRecent', function($rootScope, $http, $filter) {
            var obj = {};
            var api = 'api/recent/';

            // ----------------------------
            // SET RECENT
            // ----------------------------

            obj.put = function(data) {
                data.recent = angular.toJson(data.recent);
                return $http.post(api + 'put.php', data).then(function(results) {
                    return results;
                }).catch(function(error) {
                    return error;
                });
            };

            obj.query = function(data) {
                var recent = data;
                $rootScope.userData.recent_items = [];
                angular.forEach(recent, function(code) {
                    var product = $filter('filter')($rootScope.products, function(d) {
                        return d.code === code;
                    })[0];
                    $rootScope.userData.recent_items.push(product);
                });
            };

            return obj;
        });

})();

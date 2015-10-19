(function() {
    'use strict';

    angular
        .module('daksportsApp')
        .factory('gdRecent', function($rootScope, $http, Auth) {
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


            return obj;
        });

})();

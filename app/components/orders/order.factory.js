(function() {
    'use strict';

    angular
        .module('gdCart')
        .factory('gdOrder', function($rootScope, $http, $q, $filter, Auth) {
            var obj = {};
            var api = 'api/orders/';

            // ----------------------------
            // SET ORDER
            // ----------------------------

            obj.post = function(order) {
                var data = angular.copy(order);
                data.billing = angular.toJson(data.billing);
                data.items = angular.toJson(data.items);
                data.payment = angular.toJson(data.payment);
                data.products = angular.toJson(data.products);
                return $http.post(api + 'post.php', data).then(function(results) {
                    return results;
                }).catch(function(error) {
                    return error;
                });
            };


            return obj;
        });

})();

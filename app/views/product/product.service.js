(function() {
    'use strict';

    angular
        .module('daksportsApp')
        .factory('productRes', function productResFactory($http, $rootScope) {

            var api = 'api/products/';
            var obj = {};

            function setTypes(item) {
                item.added = new Date(item.added);
                item.inv = parseFloat(item.inv);
                item.price = parseFloat(item.price);
                item.promo = parseFloat(item.promo);
                item.published = parseFloat(item.published);
                item.promo_price = parseFloat(item.promo_price);
                item.promo_stock = parseFloat(item.promo_stock);
                if (item.promo && item.promo_price) {
                    item.old_price = item.price;
                    item.new_price = item.promo_price;
                } else {
                    item.old_price = 0;
                    item.new_price = item.price;
                };
                item.old_price = parseFloat(item.old_price);
                item.new_price = parseFloat(item.new_price);
                (item.tags) ? item.tags = item.tags.split(','): item.tags = [];
                (item.colours) ? item.colours = item.colours.split(','): item.colours = [];
                (angular.isDate(item.promo_end)) ? item.promo_end = item.promo_end: item.promo_end = new Date(item.promo_end);
                // set some defaults for testing purposes
            }

            obj.query = function() {
                return $http.get(api + 'query.php')
                    .then(function(response) {
                        var items = response.data;
                        angular.forEach(items, function(value, key) {
                            setTypes(value);
                        });
                        return items;
                    });
            };

            obj.get = function(id) {
                return $http.get(api + 'get.php?id=' + id);
            };

            obj.post = function(data) {
                return $http.post(api + 'post.php', data).then(function(results) {
                    return results;
                });
            };

            obj.put = function(data) {
                return $http.post(api + 'put.php', data).then(function(results) {
                    return results;
                });
            };

            obj.remove = function(id) {
                return $http.delete(api + 'remove.php?id=' + id).then(function(status) {
                    return status.data;
                });
            };

            return obj;
        });

})();

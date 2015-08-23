(function() {
  'use strict';

  angular
    .module('daksportsApp')
    .factory('productRes', ['$http', function productResFactory($http) {

      var api = 'api/products/';
      var obj = {};

      obj.query = function() {
        return $http.get(api + 'query.php');
      };

      obj.get = function(id) {
        return $http.get(api + 'get.php?id=' + id);
      };

      obj.post = function() {
        return $http.post(api + 'post.php').then(function(results) {
          return results;
        });
      };

      obj.put = function(id) {
        return $http.post(api + 'put.php?id=' + id).then(function(status) {
          return status.data;
        });
      };

      obj.remove = function(id) {
        return $http.delete(api + 'remove.php?id=' + id).then(function(status) {
          return status.data;
        });
      };

      return obj;
    }]);

})();

(function() {
  'use strict';

  angular
    .module('daksportsApp')
    .factory('productRes', ['$http', '$firebaseArray', function productResFactory($http, $firebaseArray) {

      var api = 'api/products/';
      var ref = new Firebase('https://daksports.firebaseio.com/items');
      var obj = $firebaseArray(ref);

      return obj;
    }]);

})();

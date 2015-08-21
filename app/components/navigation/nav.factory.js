(function() {
  'use strict';

  angular.module('daksportsApp')
    .factory('nav', function navFactory($http) {
      var obj = {
        navOpen: false,
        toggleNav: function() {
          obj.navOpen = !obj.navOpen;
        }
      };
      return obj;
    });

})();
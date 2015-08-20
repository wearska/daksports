(function() {
  'use strict';

  angular
    .module('daksportsApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

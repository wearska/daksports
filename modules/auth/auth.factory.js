'use strict';

angular.module('daksportsApp')
    .factory('Auth', ['$firebaseAuth',
        function($firebaseAuth) {
            var ref = new Firebase('https://daksports.firebaseio.com');
            return $firebaseAuth(ref);
        }
    ]);

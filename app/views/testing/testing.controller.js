(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('TestCtrl', function($http, $rootScope, $scope, $state, $timeout, $colorThief) {
            var api = 'api/products/';
            $scope.setSizes = function(){
                var data = {
                    sizes : [
                        {
                            name: "",
                            count: 0
                        }
                    ]
                }
                console.log(data);
                $http.post(api + 'putall.php', data);
            }
        });

})();

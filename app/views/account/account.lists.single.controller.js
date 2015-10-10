(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('ShoppingListCtrl', function($scope, $rootScope, $stateParams, gdShoppingLists) {


            var getList = function() {
                var d = {};
                angular.forEach(gdShoppingLists.lists, function(list) {
                    if ($stateParams.listCode === list.id) {
                        d = list;
                    }
                });
                return d;
            };
            $scope.list = getList();
            
            $scope.updateList = function(item){
                console.log("list changed");
                $rootScope.$broadcast('gdCart: changed', {});
            };

        });

})();
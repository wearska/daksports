(function() {
    'use strict';

    angular
        .module('gdCart', [])
        .run(['$rootScope', 'Auth', 'gdShoppingLists', function($rootScope, Auth, gdShoppingLists) {

            // check if there is a logged in accounts
            // and if so, get it's shopping lists.

            Auth.$onAuth(function(authData) {
                if (authData) {
                    gdShoppingLists.query(authData.uid)
                        .then(function(lists) {
                            console.log(lists.length);
                            if (lists.length) {
                                angular.forEach(lists, function(list) {
                                    var list = list.list;
                                    gdShoppingLists.restoreList(list);
                                });
                            } else {
                                gdShoppingLists.newList();
                                var firstList = gdShoppingLists.activeList();
                                firstList.syncToCart();
                            }
                        }).catch(function(error) {
                            return error;
                        });
                }
            });
        }])

})();

(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('AccountSettingsCtrl', function($scope, $rootScope, $http) {

            // --------------------------------
            // USER SETTINGS
            // --------------------------------
            $scope.showUserForm = false;
            $scope.submitUserForm = function() {
                // update user details
                var data = angular.copy($rootScope.userData);
                data.addresses = angular.toJson(data.addresses);
                data.subscriptions = angular.toJson(data.subscriptions);
                if (data.birthday) {
                    data.birthday = new Date(data.birthday);
                }
                (data.gender === 'masculin') ? data.gender = 1: (data.gender === 'feminin') ? data.gender = 2 : data.gender = data.gender;
                $http.post('api/accounts/put.php', data)
                    .then(function(response) {
                        $scope.showUserForm = false;
                        console.log(response.data);
                    }).catch(function(error) {
                        $rootScope.userData = {};
                        return error;
                    });
            };
            $scope.discardUserForm = function() {
                $scope.showUserForm = false;
            };

            // --------------------------------
            // BILLING SETTINGS
            // --------------------------------

            $scope.address = {};
            $scope.$watch(
                // This function returns the value being watched. It is called for each turn of the $digest loop
                function() {
                    return $rootScope.userData;
                },
                // This is the change listener, called when the value returned from the above function changes
                function(newValue, oldValue) {
                    var user = $rootScope.userData;
                    if (newValue !== oldValue) {
                        // Only increment the counter if the value changed
                        angular.forEach(user.addresses, function(address){
                            if(address.selected){
                                var idx = user.addresses.indexOf(address);
                                $scope.address.default = idx;
                            };
                        });
                    }
                }
            );
            $scope.showAddressForm = false;
            $scope.newaddress = {
                selected: 1
            };
            $scope.removeAddress = function(idx){
                $rootScope.userData.addresses.splice(idx, 1);
            };
            $scope.submitAddressForm = function() {
                // update user details
                var data = angular.copy($rootScope.userData);
                angular.forEach(data.addresses, function(address){
                    address.selected = 0;
                    data.addresses[parseInt($scope.address.default)].selected = 1;
                });
                data.addresses.push($scope.newaddress);
                data.addresses = angular.toJson(data.addresses);
                data.subscriptions = angular.toJson(data.subscriptions);
                if (data.birthday) {
                    data.birthday = new Date(data.birthday);
                }
                (data.gender === 'masculin') ? data.gender = 1: (data.gender === 'feminin') ? data.gender = 2 : data.gender = data.gender;
                $http.post('api/accounts/put.php', data)
                    .then(function(response) {
                        $scope.showUserForm = false;
                        console.log(response.data);
                    }).catch(function(error) {
                        $rootScope.userData = {};
                        return error;
                    });
            };
            $scope.discardAddressForm = function() {
                $scope.showAddressForm = false;
                $scope.newaddress = {};
            };

        });

})();

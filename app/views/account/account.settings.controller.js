(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('AccountSettingsCtrl', function($scope, $rootScope, $http) {

            // --------------------------------
            //  FORM SUBMIT
            // --------------------------------

            $scope.submitForm = function() {
                // update user details
                var data = angular.copy($rootScope.userData);
                if($scope.newaddress){
                    data.addresses.push($scope.newaddress);
                    $rootScope.userData.addresses.push($scope.newaddress);
                    $rootScope.userData.defaults.address = ($rootScope.userData.addresses.length -1);
                    $scope.discardAddressForm();
                };
                if($scope.newbusiness){
                    data.businesses.push($scope.newbusiness);
                    $rootScope.userData.businesses.push($scope.newbusiness);
                    $rootScope.userData.defaults.address = ($rootScope.userData.businesses.length -1);
                    $scope.discardBusinessForm();
                };
                data.addresses = angular.toJson(data.addresses);
                data.businesses = angular.toJson(data.businesses);
                data.subscriptions = angular.toJson(data.subscriptions);
                data.defaults = angular.toJson(data.defaults);
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


            // --------------------------------
            // USER SETTINGS
            // --------------------------------
            $scope.showUserForm = false;
            $scope.discardUserForm = function() {
                $scope.showUserForm = false;
            };

            // --------------------------------
            // DELIVERY ADDRESS
            // --------------------------------
            $scope.showAddressForm = false;
            $scope.removeAddress = function(idx){
                $rootScope.userData.addresses.splice(idx, 1);
                $scope.submitForm();
            };
            $scope.discardAddressForm = function() {
                $scope.showAddressForm = false;
                $scope.newaddress = null;
                $scope.addressForm.$setPristine();
                $scope.addressForm.$setUntouched();
            };

            // ------------------------------
            // BILLING
            // ------------------------------

            $scope.showBusinessForm = false;
            $scope.removeBusiness = function(idx){
                $rootScope.userData.businesses.splice(idx, 1);
                $scope.submitForm();
            };
            $scope.discardBusinessForm = function() {
                $scope.showBusinessForm = false;
                $scope.newbusiness = null;
                $scope.businessForm.$setPristine();
                $scope.businessForm.$setUntouched();
            };

            // -------------------------------
            // NOTIFICATIONS
            // -------------------------------

        });

})();

'use strict';

angular.module('daksportsApp')
    .factory('Auth', ['$firebaseAuth',
        function($firebaseAuth) {
            var ref = new Firebase('https://daksports.firebaseio.com');
            return $firebaseAuth(ref);
        }
    ]).factory('UserData', ['Auth', 'Account',
        function(Auth, Account) {
            // Create a callback which logs the current auth state
            var userData = {};
            function getUserData(authData){
                if (authData) {
                    // console.log(authData.password);
                    Account.getUserData(authData.password.email)
                        .then(function(response) {
                            userData = response;
                        }).catch(function(error) {
                            // $scope.error = error;
                        });
                } else {
                    userData = {};
                }
            }
            
            Auth.$onAuth(getUserData);
            
            var obj = {
                getUserData : function(){
                    return userData;
                },
                getUserPhoto : function(){
                    return userData.user_photo;
                }
            };
            return obj;
        }
    ]);
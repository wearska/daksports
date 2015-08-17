'use strict';

angular.module('daksportsApp')
    .factory('Account', ['$http', '$firebaseAuth',
        function($http, $firebaseAuth) {
            var obj = {
                getUserData: function(email) {
                    return $http.get('api/accounts/getuserdata.php?email=' + email)
                        .then(function(response) {
                            return response.data;
                        }).catch(function(error) {
                            return error;
                        });
                }
            };
            return obj;
        }
    ]);
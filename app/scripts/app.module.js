(function() {
    'use strict';

    angular
        .module('daksportsApp', [
            'ngAnimate',
            'ngAria',
            'ngCookies',
            'ngMaterial',
            'ngMessages',
            'ngResource',
            'ngSanitize',
            'ngTouch',
            'ui.router',
            'angularFileUpload',
            'firebase',
            'ngCart'
        ]);

    function fetchData() {
        var initInjector = angular.injector(["ng"]);
        var $http = initInjector.get("$http");
        var $rootScope = initInjector.get("$rootScope");

        //   get structure
        var api = 'api/categories/';
        return $http.get(api + 'query.brands.php').then(function(response) {
            angular
                .module('daksportsApp').constant("cBrands", response.data);
        }).catch(function(error) {
            return error;
        });

    }

    function bootstrapApplication() {
        angular.element(document).ready(function() {
            angular.bootstrap(document.body, ["daksportsApp"]);
        });
    }
    
    
    fetchData().then(bootstrapApplication);

})();
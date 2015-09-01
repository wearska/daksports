(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('AdminCtrl', function($scope, $rootScope, $mdDialog, $timeout, $q, $log, productRes) {

            //hide the nvigation menu
            $rootScope.noNav = true;
            $scope.$on('$destroy', function() {
                $rootScope.noNav = false;
            });

            //set product available colours
            $scope.colours = [
                'black',
                'white',
                'brown',
                'red',
                'orange',
                'gold',
                'yellow',
                'green',
                'teal',
                'cyan',
                'blue',
                'indigo',
                'violet',
                'pink'
            ];


            // colour click function
            $scope.addColour = function(ev, colour) {
                var el = angular.element(ev.currentTarget);
                if (el.hasClass("active")) {
                    el.removeClass("active");
                    var index = $scope.product.colours.indexOf(colour);
                    $scope.product.colours.splice(index, 1);
                } else {
                    el.addClass("active");
                    $scope.product.colours.push(colour);
                }
                console.log($scope.product.colours);
            }

            // product templates

            $scope.simulateQuery = false;
            $scope.isDisabled = false;
            $scope.$on('products:filled', function(event, item) {
                console.log("products ready");
                    $scope.templates = loadAll();
            });
            $scope.querySearch = querySearch;
            $scope.selectedItemChange = selectedItemChange;
            $scope.searchTextChange = searchTextChange;

            // Search for templates... use $timeout to simulate remote dataservice call.
            
            function querySearch(query) {
                var results = query ? $scope.templates.filter(createFilterFor(query)) : $scope.templates,
                    deferred;
                if ($scope.simulateQuery) {
                    deferred = $q.defer();
                    $timeout(function() {
                        deferred.resolve(results);
                    }, Math.random() * 1000, false);
                    return deferred.promise;
                } else {
                    return results;
                }
            }

            function searchTextChange(text) {
                $log.info('Text changed to ' + text);
            }

            function selectedItemChange(item) {
                $log.info('Item changed to ' + JSON.stringify(item));
                $scope.product = angular.copy(item);
            }

            /**
             * Build `components` list of key/value pairs
             */
            function loadAll() {
                console.log("loadall");
                var templates = $rootScope.products;
                return templates.map(function(template) {
                    template.value = template.name.toLowerCase();
                    return template;
                });
            }
            /**
             * Create filter function for a query string
             */
            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(item) {
                    return (item.value.indexOf(lowercaseQuery) === 0);
                };
            }
        });

})();
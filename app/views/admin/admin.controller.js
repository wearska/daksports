(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('AdminCtrl', function($scope, $rootScope, $mdDialog, $timeout, $q, $log, productRes) {

            //hide the nvigation menu
            $rootScope.noNav = true;
            $scope.$on('$destroy', function() {
                $rootScope.noNav = false;
            });
            $scope.state = null;


            // Reset object
            var reset = {
                code: " ",
                name: "",
                subname: "",
                slug: "",
                price: 0,
                inv: 0,
                promo: 0,
                promo_price: 0,
                promo_stock: 0,
                promo_end: null,
                excerpt: "",
                description: "",
                brand: "",
                type: "",
                kind: "",
                tags: [],
                age: 0,
                gender: 0,
                colours: [],
                file1: "uploads/placeholder.png",
                file2: "uploads/placeholder.png",
                file3: "uploads/placeholder.png",
                file4: "uploads/placeholder.png",
                file5: "uploads/placeholder.png",
                added: new Date(),
                favourite: "",
                published: 1
            };

            // Initial state
            $scope.product = angular.copy(reset);

            // colour click function
            $scope.selectedColour = '';
            $scope.colours = [
                'black',
                'grey',
                'white',
                'peru',
                'maroon',
                'red',
                'orange',
                'yellow',
                'lime',
                'green',
                'teal',
                'cyan',
                'cornflowerblue',
                'blue',
                'blueviolet',
                'magenta',
                'pink'
            ]

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
            }

            // product templates

            $scope.simulateQuery = false;
            $scope.isDisabled = false;
            if ($rootScope.products) {
                $scope.templates = loadAll();
            } else {
                $scope.$on('products:filled', function(event, item) {
                    $scope.templates = loadAll();
                });
            }

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

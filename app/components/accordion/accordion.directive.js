(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('AccordionCtrl', function() {
            
        })
        .directive("gdAccordion", function($window, $rootScope, $timeout) {
            return {
                controller: function() {
                },
                controllerAs: 'accordion',
                link: function(scope, element, attrs, accordion) {
                    var height = 90;
                    accordion.expanded = false;
                    accordion.maxHeight = height;
                    accordion.expand = function(){
                        accordion.expanded = !accordion.expanded;
                        if(!accordion.expanded){
                            accordion.maxHeight = 90;
                        }else{
                            accordion.maxHeight = height;
                        }
                    };
                    $timeout(function() {
                        height = angular.element(element)[0].scrollHeight + 16;
                        accordion.expand();
                    }, 1000)
                }
            }
        });

})();
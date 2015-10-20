(function() {
    'use strict';

    angular.module('daksportsApp')
        .directive('gdTabs', function($interval) {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: true,
                templateUrl: 'app/components/tabs/tabs.tpl.html',
                link: function(scope, el, attr) {
                    el.addClass('gd-tabs');
                }
            }
        })
        .directive('gdTab', function($interval) {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                templateUrl: 'app/components/tabs/tab.tpl.html',
                link: function(scope, el, attr) {
                    el.addClass('gd-tab');
                    var allTabs = el.siblings('.gd-tab').andSelf();
                    console.log(allTabs);
                }
            }
        })
        .directive('gdTabLabel', function($interval) {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                templateUrl: 'app/components/tabs/tab-label.tpl.html',
                link: function(scope, el, attr) {
                    el.addClass('gd-tab-label');
                }
            }
        })
        .directive('gdTabContent', function($interval) {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                templateUrl: 'app/components/tabs/tab-content.tpl.html',
                link: function(scope, el, attr) {
                    el.addClass('gd-tab-content');
                }
            }
        });

})();

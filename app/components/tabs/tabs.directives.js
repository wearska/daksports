(function() {
    'use strict';

    angular.module('daksportsApp')
        .directive('gdTabs', function() {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                templateUrl: 'app/components/tabs/tabs.tpl.html',
                link: function(scope, el, attr) {
                    el.addClass('gd-tabs');
                    scope.active = 'tadaaa';
                }
            }
        })
        .directive('gdTab', function($timeout) {
            var directiveDefinitionObject = {
                restrict: 'E',
                replace: true,
                transclude: true,
                templateUrl: 'app/components/tabs/tab.tpl.html',
                compile: function compile(tElement, tAttrs, transclude) {
                    return {
                        pre: function preLink(scope, iElement, iAttrs, controller) {
                            // ........
                        },
                        post: function postLink(scope, iElement, iAttrs, controller) {
                            $timeout(function() {
                                //DOM has finished rendering
                                iElement.addClass('gd-tab');
                                var indicator = angular.element(iElement.siblings('.gd-tab-indicator'));
                                
                                iElement.on('click', function() {
                                    var $this = angular.element(this);
                                    var allTabs = $this.siblings();
                                    var $active;
                                    if($this.hasClass('active')){
                                        $active = $this;
                                        allTabs.removeClass('active to-right to-left');
                                        indicator.css({
                                            left: $this[0].offsetLeft,
                                            right: $this.parent()[0].offsetWidth - $this[0].offsetLeft - $this[0].offsetWidth
                                        });
                                    }else{
                                        $active = $this.siblings('.active');
                                        var direction = ($this[0].offsetLeft - $active[0].offsetLeft);
                                        if (direction > 0) {
                                            indicator.removeClass('to-left');
                                            indicator.addClass('to-right');
                                        } else {
                                            indicator.removeClass('to-right');
                                            indicator.addClass('to-left');
                                        }
                                        indicator.css({
                                            left: $this[0].offsetLeft,
                                            right: $this.parent()[0].offsetWidth - $this[0].offsetLeft - $this[0].offsetWidth
                                        });
                                        
                                        allTabs.removeClass('active');
                                        $this.addClass('active');
                                    }
                                });
                                if(iElement.hasClass('active')){
                                     iElement.click();
                                };
                            });
                        }
                    }
                    // or
                    // return function postLink( ... ) { ... }
                }
            };
            return directiveDefinitionObject;
        })
        .directive('gdTabLabel', function() {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: false,
                templateUrl: 'app/components/tabs/tab-label.tpl.html',
                link: function(scope, el, attr) {
                    el.addClass('gd-tab-label');
                }
            }
        })
        .directive('gdTabContent', function() {
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
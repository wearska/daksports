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
        .directive('gdTab', function() {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                templateUrl: 'app/components/tabs/tab.tpl.html',
                link: function(scope, el, attr) {
                    el.addClass('gd-tab');
                    var indicator = angular.element(el.siblings('.gd-tab-indicator'));
                    el.on('click', function(){
                        var $this = angular.element(this);
                        var $active = angular.element($this.siblings('.active'));
                        var allTabs = $this.siblings();
                        allTabs.removeClass('active to-right to-left');
                        $this.addClass('active');
                        var direction = ($this[0].offsetLeft - $active[0].offsetLeft);

                        if(direction > 0){
                            indicator.removeClass('to-left');
                            indicator.addClass('to-right');
                        }else{
                            indicator.removeClass('to-right');
                            indicator.addClass('to-left');
                        }
                        indicator.css({
                            left: $this[0].offsetLeft,
                            right : $this.parent()[0].offsetWidth - $this[0].offsetLeft - $this[0].offsetWidth
                        });
                    });
                }
            }
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

(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('ListCtrl', function($scope, $rootScope, $filter, $timeout, $mdDialog, $mdToast, productRes) {
            $scope.search = "";
            $scope.clearSearch = function() {
                $scope.search = "";
            };

            $scope.publish = function(event, item) {
                item.published = !item.published;
                event.stopPropagation();
            };

            $scope.viewCard = function(event, item) {
                $rootScope.previewItem = angular.copy(item);
                $timeout(function() {
                    $mdDialog.show({
                            templateUrl: 'app/views/admin/admin.list.cardview.tpl.html',
                            parent: angular.element(document.main),
                            controller: 'ListCtrl',
                            targetEvent: event,
                            clickOutsideToClose: true
                        })
                        .then(function(answer) {
                            $scope.status = 'You said the information was "' + answer + '".';
                        }, function() {
                            $scope.status = 'You cancelled the dialog.';
                        });
                }, 200);
                event.stopPropagation();
            };

            var originatorEv;
            $scope.openMenu = function($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdOpenMenu(ev);
            };


            var showConfirmToast = function(product){
                $mdToast.show(
                    $mdToast.simple()
                    .content(product.code + ' - ' + product.name + ' ' + product.subname + ' a fost sters')
                    .action('Ok')
                    .hideDelay(0)
                );
            };
            $scope.remove = function(event, item) {
                var confirm = $mdDialog.confirm()
                    .title('Esti sigur ca vrei sa stergi acest produs?')
                    .content('<br>Aceasta actiune este <span style="color: rgb(183,28,28);">permanenta si ireversibila!</span><br>Va sterge produsul din baza de date.<br>Daca vrei doar ca el sa nu mai apra pe site, poti sa folosesti optiunea de a nu-l publica')
                    .ariaLabel('Atentionare stergere produs')
                    .targetEvent(event)
                    .ok('Sterge!')
                    .cancel('Anuleaza');
                $mdDialog.show(confirm).then(function() {
                    angular.forEach($rootScope.products, function(product){
                        if(product.code === item.code){
                            var idx = $rootScope.products.indexOf(product);
                            $rootScope.products.splice(idx, 1);
                            showConfirmToast(product);
                        }
                    });
                }, function() {
                    item.published = 0;
                });
            };
        });

})();

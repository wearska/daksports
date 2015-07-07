'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.directive:gdFiles
 * @description
 * # gdFiles
 * Directive of the daksportsApp
 */

angular.module('daksportsApp')
    .directive('gdFiles', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, elm, attrs) {
                elm.bind('change', function() {
                    $parse(attrs.gdFiles)
                        .assign(scope, elm[0].files[0].name);
                    scope.$apply();
                });
            }
        }
    }])
    .directive('gdThumb', function() {
        return {
            link: function($scope, elm) {
                elm.bind("change", function(e) {
                    $scope.file = (e.srcElement || e.target).files[0];
                    $scope.getFile();
                });
            }
        }
    })
    .controller('UploadController', function($scope, fileReader) {
        console.log('fileReader');
        $scope.getFile = function() {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    $scope.imageSrc = result;
                });
        };
    });

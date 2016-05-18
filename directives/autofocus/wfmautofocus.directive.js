angular.module('wfm.autofocus', [])

.directive('autofocus', ['$timeout', function($timeout) {
    'use strict';
    return {
        restrict: 'A',
        link : function($scope, $element) {
            $timeout(function() {
                $element[0].focus();
            });
        }
    };
}]);

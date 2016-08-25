(function () {
    'use strict';

    var module = angular.module('ui.grid');

    module.directive('uiGridDisableAnimation', ['$animate',
    function ($animate) {
        return {
            replace: true,
            priority: 0,
            require: '^uiGrid',
            scope: false,
            link: function ($scope, $elm, $attrs, uiGridCtrl) {
            $animate.enabled($elm, false);
        }
        };
    }]);
})();

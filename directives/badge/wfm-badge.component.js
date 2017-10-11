(function () {
    'use strict';

    angular.module('wfm.badge', ['ngAnimate'])
    .component('wfmBadge',
    {
        templateUrl: 'directives/badge/badge.tpl.html',
        controller: BadgeCtrl,
        bindings: {
            badgeModel: '<',
            status: '<',
            pulse: '<',
            showEmpty: '<'
        }
    });

    BadgeCtrl.$inject = ['$animate', '$element'];
    function BadgeCtrl($animate, $element) {
        var ctrl = this;
        ctrl.$onChanges = function (changes) {
            if (!ctrl.pulse) {
                return;
            }
            var element = $element[0].childNodes[0].childNodes[1];
            $animate.addClass(element, 'pulse').then(function() {
                $animate.removeClass(element, 'pulse');
            });
        };
    }
})();

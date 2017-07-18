(function () {
    'use strict';

    angular.module('wfm.badge', [])
    .component('wfmBadge',
    {
        templateUrl: 'directives/badge/badge.tpl.html',
        controller: BadgeCtrl,
        bindings: {
            badgeModel: '=',
            status: '<'
        }
    });

    BadgeCtrl.$inject = [];
    function BadgeCtrl() {
        var ctrl = this;
    }
})();

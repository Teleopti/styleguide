(function () {
    'use strict';

    angular.module('wfm.badge', [])
    .component('wfmBadge',
    {
        template: '<span class="wfm-badge material-depth-1 grow-out" ng-class="$ctrl.status"  ng-if="$ctrl.badgeModel>0">{{$ctrl.badgeModel}}</span>',
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

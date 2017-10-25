(function () {
    'use strict';

    angular.module('wfm.btnGroup', [])
    .component('wfmBtnGroup',
    {
        templateUrl: 'directives/btn-group/btn-group.tpl.html',
        controller: BtnGroupCtrl,
        bindings: {
            items: '<',
            selected: '=',
            btnClass: '<',
            selectionClass: '<'
        }
    });

    BtnGroupCtrl.$inject = [];
    function BtnGroupCtrl() {
        var ctrl = this;

        ctrl.groupItemClick = groupItemClick;
        function groupItemClick(item) {
            ctrl.selected = item;
        }
    }
})();

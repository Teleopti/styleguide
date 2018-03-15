(function () {
    'use strict';

    angular.module('wfm.btnGroup', ['pascalprecht.translate'])
    .component('wfmBtnGroup',
    {
        templateUrl: 'directives/btn-group/btn-group.tpl.html',
        controller: BtnGroupCtrl,
        bindings: {
            items: '<',
            selected: '<',
            output: '<',
            btnClass: '<',
            selectionClass: '<'
        }
    });

    BtnGroupCtrl.$inject = ['$translate'];
    function BtnGroupCtrl($translate) {
        var ctrl = this;

        ctrl.$onInit = function () {
            if (ctrl.selected) {
                ctrl.output(ctrl.selected)
            }
        }
    }
})();

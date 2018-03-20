(function () {
    'use strict';

    angular
        .module('wfm.skillPicker', [])
        .component('skillPicker', {
            templateUrl: 'directives/skill-picker/skill-picker.tpl.html',
            controller: SkillPickerComponentController,
            bindings: {
                skills: '<',
                skillAreas: '<',
                itemToReturn: '&',
                preselectedItem: '<'
            },
        });
    SkillPickerComponentController.inject = [];
    function SkillPickerComponentController() {
        var ctrl = this;
        ctrl.skillsLoaded = true;
        ctrl.skillAreasLoaded = true;
        ctrl.selectedSkill;
        ctrl.selectedSkillArea;

        ctrl.$onInit = function () {
            setPreselected();
        }

        ctrl.$onChanges = function (changesObj) {
            setPreselected();
        }

        ctrl.selectSkill = function (skill) {
            var returnedSkill;
            if (skill !== undefined) {
                ctrl.selectedSkillArea = null;
                returnedSkill = skill;
            } else if (ctrl.selectedSkillArea === null && ctrl.selectedSkill === null) {
                returnedSkill = undefined;
            }
            ctrl.itemToReturn && ctrl.itemToReturn({selectedItem:returnedSkill});
        }

        ctrl.selectSkillArea = function (skillArea) {
            var returnedValue;
            if (skillArea !== undefined) {
                ctrl.selectedSkill = null;
                returnedValue = skillArea;
            } else if (ctrl.selectedSkill === null && ctrl.selectedSkillArea === null) {
                returnedValue = undefined;
            }
            ctrl.itemToReturn && ctrl.itemToReturn({selectedItem:returnedValue});
        }

        function setPreselected() {
            if (!ctrl.preselectedItem) {
                return
            }
            if (angular.isDefined(ctrl.preselectedItem.skillIds)) {
                ctrl.selectedSkill = ctrl.skills.find(function (skill) {
                    return skill.Id === ctrl.preselectedItem.skillIds[0];
                });
            } else if (angular.isDefined(ctrl.preselectedItem.skillAreaId)) {
                ctrl.selectedSkillArea = ctrl.skillAreas.find(function (sa) {
                    return sa.Id === ctrl.preselectedItem.skillAreaId
                });
            }
        }
    }
})();

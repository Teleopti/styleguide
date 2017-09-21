(function () {
    'use strict';

    angular
        .module('wfm.skillPicker', [])
        .component('skillPicker', {
            templateUrl: 'directives/skill-picker/skill-picker.tpl.html',
            controller: SkillPickerComponentController,
            bindings: {
                skills: '=',
                skillAreas: '=',
                itemToReturn: '=',
                preselectedItem: '='
            },
        });
    SkillPickerComponentController.inject = [];
    function SkillPickerComponentController() {
        var ctrl = this;

        ctrl.skillsLoaded = true;
        ctrl.skillAreasLoaded = true;
        ctrl.$onInit = function () {
            if (angular.isDefined(ctrl.preselectedItem.skillIds)) {
                ctrl.selectedSkill = ctrl.skills.find(function(skill) {
                    return skill.Id === ctrl.preselectedItem.skillIds[0];
                });
            } else {
                ctrl.selectedSkillArea = ctrl.skillAreas.find(function(sa) {
                    return sa.Id === ctrl.preselectedItem.skillAreaId
                });
            }
        }

        ctrl.selectSkill = function (skill) {
            if (skill !== undefined) {
                ctrl.selectedSkillArea = null;
                ctrl.itemToReturn(skill);
            } else if (ctrl.selectedSkillArea === null && ctrl.selectedSkill === null) {
                ctrl.itemToReturn(undefined);
            }
        }

        ctrl.selectSkillArea = function (skillArea) {
            if (skillArea !== undefined) {
                ctrl.selectedSkill = null;
                ctrl.itemToReturn(skillArea);
            } else if (ctrl.selectedSkill === null && ctrl.selectedSkillArea === null) {
                ctrl.itemToReturn(undefined);
            }
        }
    }
})();

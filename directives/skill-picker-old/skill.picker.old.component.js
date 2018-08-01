(function() {
    'use strict';

    angular.module('wfm.skillPickerOld', []).component('skillPicker', {
        templateUrl: 'directives/skill-picker-old/skill-picker.old.tpl.html',
        controller: SkillPickerOldComponentController,
        bindings: {
            skills: '<',
            skillAreas: '<',
            itemToReturn: '=',
            preselectedItem: '<'
        }
    });
    SkillPickerOldComponentController.inject = [];
    function SkillPickerOldComponentController() {
        var ctrl = this;
        ctrl.skillsLoaded = true;
        ctrl.skillAreasLoaded = true;
        ctrl.selectedSkill;
        ctrl.selectedSkillArea;

        ctrl.$onInit = function() {
            setPreselected();
        };

        ctrl.$onChanges = function(changesObj) {
            setPreselected();
        };

        ctrl.selectSkill = function(skill) {
            if (skill !== undefined) {
                ctrl.selectedSkillArea = null;
                ctrl.itemToReturn(skill);
            } else if (ctrl.selectedSkillArea === null && ctrl.selectedSkill === null) {
                ctrl.itemToReturn(undefined);
            }
        };

        ctrl.selectSkillArea = function(skillArea) {
            if (skillArea !== undefined) {
                ctrl.selectedSkill = null;
                ctrl.itemToReturn(skillArea);
            } else if (ctrl.selectedSkill === null && ctrl.selectedSkillArea === null) {
                ctrl.itemToReturn(undefined);
            }
        };

        function setPreselected() {
            if (!ctrl.preselectedItem) {
                return;
            }
            if (angular.isDefined(ctrl.preselectedItem.skillIds)) {
                ctrl.selectedSkill = ctrl.skills.find(function(skill) {
                    return skill.Id === ctrl.preselectedItem.skillIds[0];
                });
            } else if (angular.isDefined(ctrl.preselectedItem.skillAreaId)) {
                ctrl.selectedSkillArea = ctrl.skillAreas.find(function(sa) {
                    return sa.Id === ctrl.preselectedItem.skillAreaId;
                });
            }
        }
    }
})();

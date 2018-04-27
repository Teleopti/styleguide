(function() {
    angular.module('wfm.skillPicker', []).component('theSkillPicker', {
        templateUrl: 'directives/skill-picker/skillPicker.tpl.html',
        controller: theComponent,
        bindings: {
            skills: '<', //The list of skills to display, each object should contain at least Name and Id.
            skillGroups: '<', //The list of skillgroups to display, each object should contain at least Name and Id.
            preselectedSkill: '<', //The skill to display as the component loads
            preselectedSkillGroup: '<', //The skillgroups to display as the component loads
            onSkillSelected: '&', //Function to execute when skill is selected
            onSkillGroupSelected: '&', //Function to execute when skillgroup is selected
            onClearSkillSelection: '&', //Function to execute when skill selection is cleared (x)
            onClearSkillGroupSelection: '&' //Function to execute when skillgroup selection is cleared (x)
        }
    });

    theComponent.$inject = ['$translate', 'skillIconService'];

    function theComponent($translate, skillIconService) {
        var ctrl = this;

        ctrl.selectedSkill = '';
        ctrl.selectedSkillGroup = '';
        ctrl.getSkillIcon = skillIconService.get;

        ctrl.skillSelected = function(skill) {
            ctrl.skillPickerOpen = false;
            ctrl.skillPickerText = skill.Name;
            ctrl.skillGroupPickerText = '';
            ctrl.onSkillSelected({ skill: skill });
        };

        ctrl.skillGroupSelected = function(skillGroup) {
            ctrl.skillGroupPickerText = skillGroup.Name;
            ctrl.skillGroupPickerOpen = false;
            ctrl.skillPickerText = '';
            ctrl.onSkillGroupSelected({ skillGroup: skillGroup });
        };

        ctrl.clearSkillSelection = function() {
            ctrl.skillPickerOpen = true;
            ctrl.skillPickerText = '';
            if (angular.isDefined(ctrl.onClearSkillSelection)) {
                ctrl.onClearSkillSelection();
            }
        };

        ctrl.clearSkillGroupSelection = function() {
            ctrl.skillGroupPickerOpen = true;
            ctrl.skillGroupPickerText = '';
            if (angular.isDefined(ctrl.onClearSkillGroupSelection)) {
                ctrl.onClearSkillGroupSelection();
            }
        };

        ctrl.$onChanges = function(changesObj) {
            setPreselected(changesObj);
        };

        function setPreselected(changesObj) {
            if (angular.isUndefined(changesObj)) {
                return;
            }
            if (angular.isDefined(changesObj.preselectedSkill) && changesObj.preselectedSkill !== null) {
                if (
                    changesObj.preselectedSkill.currentValue !== null &&
                    angular.isDefined(changesObj.preselectedSkill.currentValue)
                ) {
                    ctrl.skillPickerText = changesObj.preselectedSkill.currentValue.Name;
                } else {
                    ctrl.skillPickerText = '';
                }
            }
            if (angular.isDefined(changesObj.preselectedSkillGroup) && changesObj.preselectedSkillGroup !== null) {
                if (
                    changesObj.preselectedSkillGroup.currentValue !== null &&
                    angular.isDefined(changesObj.preselectedSkillGroup.currentValue)
                ) {
                    ctrl.skillGroupPickerText = changesObj.preselectedSkillGroup.currentValue.Name;
                } else {
                    ctrl.skillGroupPickerText = '';
                }
            }
        }
    }
})();

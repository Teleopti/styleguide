(function() {
    angular.module('wfm.skillPicker', []).component('theSkillPicker', {
        templateUrl: 'directives/skill-picker/skillPicker.html',
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

    theComponent.$inject = ['$translate'];

    function theComponent($translate) {
        var ctrl = this;

        ctrl.selectedSkill = '';
        ctrl.selectedSkillGroup = '';

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

        ctrl.$onInit = function() {
            setPreselected();
        };

        function setPreselected(changesObj) {
            if (angular.isDefined(changesObj.preselectedSkill) && changesObj.preselectedSkill !== null) {
                if (changesObj.preselectedSkill.currentValue !== null) {
                    ctrl.skillPickerText = changesObj.preselectedSkill.currentValue.Name;
                } else {
                    ctrl.skillPickerText = '';
                }
            }
            if (angular.isDefined(changesObj.preselectedSkillGroup) && changesObj.preselectedSkillGroup !== null) {
                if (changesObj.preselectedSkillGroup.currentValue !== null) {
                    ctrl.skillGroupPickerText = changesObj.preselectedSkillGroup.currentValue.Name;
                } else {
                    ctrl.skillGroupPickerText = '';
                }
            }
        }
    }
})();

'use strict';

describe('skillPickerOldComponent', function() {
    var $componentController,
        ctrl,
        mockedSkills,
        mockedSkillAreas,
        mockedItemToReturn,
        preselectedSkill,
        preselectedSkillArea;

    beforeEach(function() {
        module('wfm.skillPickerOld');
    });

    beforeEach(
        inject(function(_$componentController_) {
            $componentController = _$componentController_;

            mockedSkills = [
                {
                    Id: 'XYZ',
                    Name: 'skill1'
                },
                {
                    Id: 'ABC',
                    Name: 'skill2'
                }
            ];

            mockedSkillAreas = [
                {
                    Name: 'SkillArea1',
                    Id: '123',
                    Skills: [
                        {
                            Id: 'XYZ',
                            Name: 'skill1'
                        }
                    ]
                },
                {
                    Name: 'SkillArea2',
                    Id: '321',
                    Skills: [
                        {
                            Id: 'ABC',
                            Name: 'skill2'
                        }
                    ]
                }
            ];

            preselectedSkill = { skillIds: ['XYZ'] };
            preselectedSkillArea = { skillAreaId: '123' };

            mockedItemToReturn = function(item) {};
        })
    );

    it('should clear first input when selecting other input', function() {
        ctrl = $componentController('skillPicker', null, {
            skills: mockedSkills,
            skillAreas: mockedSkillAreas,
            itemToReturn: mockedItemToReturn
        });
        spyOn(ctrl, 'itemToReturn');
        ctrl.$onInit();
        ctrl.selectedSkill = ctrl.skills[0];
        ctrl.selectSkill(ctrl.skills[0]);
        ctrl.selectedSkillArea = ctrl.skillAreas[0];
        ctrl.selectSkillArea(ctrl.skillAreas[0]);

        expect(ctrl.selectedSkill).toEqual(null);
        expect(ctrl.selectedSkillArea).toEqual(ctrl.skillAreas[0]);
        expect(ctrl.itemToReturn).toHaveBeenCalledWith(ctrl.skillAreas[0]);
    });

    it('should be able to clear skill input', function() {
        ctrl = $componentController('skillPicker', null, {
            skills: mockedSkills,
            skillAreas: mockedSkillAreas,
            itemToReturn: mockedItemToReturn
        });
        spyOn(ctrl, 'itemToReturn');
        ctrl.$onInit();
        ctrl.selectedSkill = ctrl.skills[0];
        ctrl.selectSkill(ctrl.skills[0]);
        ctrl.selectedSkill = null;
        ctrl.selectSkill(undefined);

        expect(ctrl.selectedSkill).toEqual(null);
        expect(ctrl.itemToReturn).toHaveBeenCalledWith(undefined);
    });

    it('should be able to clear skillArea input', function() {
        ctrl = $componentController('skillPicker', null, {
            skills: mockedSkills,
            skillAreas: mockedSkillAreas,
            itemToReturn: mockedItemToReturn
        });
        spyOn(ctrl, 'itemToReturn');
        ctrl.$onInit();
        ctrl.selectedSkillArea = ctrl.skillAreas[0];
        ctrl.selectSkillArea(ctrl.skillAreas[0]);
        ctrl.selectedSkillArea = null;
        ctrl.selectSkillArea(undefined);

        expect(ctrl.selectedSkillArea).toEqual(null);
        expect(ctrl.itemToReturn).toHaveBeenCalledWith(undefined);
    });

    xit('should have preselected skill', function() {
        ctrl = $componentController('skillPicker', null, {
            skills: mockedSkills,
            skillAreas: mockedSkillAreas,
            itemToReturn: mockedItemToReturn,
            preselectedItem: preselectedSkill
        });

        ctrl.$onInit();
        expect(ctrl.selectedSkill).toEqual(mockedSkills[0]);
    });

    xit('should have preselected skill area', function() {
        ctrl = $componentController('skillPicker', null, {
            skills: mockedSkills,
            skillAreas: mockedSkillAreas,
            itemToReturn: mockedItemToReturn,
            preselectedItem: preselectedSkillArea
        });

        ctrl.$onInit();
        expect(ctrl.selectedSkillArea).toEqual(mockedSkillAreas[0]);
    });
});

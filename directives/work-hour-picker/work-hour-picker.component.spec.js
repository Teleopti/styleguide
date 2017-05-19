'use strict';
describe('component: workPicker', function() {
    var $httpBackend,
    $componentController,
    ctrl;

    beforeEach(function() {
        module('wfm.workPicker');
    });

    beforeEach(inject(function(_$httpBackend_, _$componentController_) {
        $httpBackend = _$httpBackend_;
        $componentController = _$componentController_;
    }));

    it('should be able to select a day', function() {
        ctrl = $componentController('workPicker', null, {});
        ctrl.selectDay(ctrl.weekdays[0]);
        expect(ctrl.weekdays[0].IsSelected).toEqual(true);
        expect(ctrl.selectedDays.length).toEqual(1);
    });

    it('should be able to deselect a day', function() {
        ctrl = $componentController('workPicker', null, {});
        ctrl.selectDay(ctrl.weekdays[0]);
        ctrl.selectDay(ctrl.weekdays[0]);
        expect(ctrl.weekdays[0].IsSelected).toEqual(false);
        expect(ctrl.selectedDays.length).toEqual(0);
    });

    it('should be able to cancel', function() {
        ctrl = $componentController('workPicker', null, {});
        var form = {
            closeHour: '15:00',
            openHour: '14:00',
            $invalid: false
        }

        ctrl.selectDay(ctrl.weekdays[0]);
        ctrl.closeWorkingPicker(form);

        expect(ctrl.weekdays[0].IsSelected).toEqual(false);
        expect(form.closeHour).toEqual('');
        expect(form.openHour).toEqual('');
        expect(ctrl.selectedDays.length).toEqual(0);
    });

    it('should be able to apply hours', function() {
        ctrl = $componentController('workPicker', null, {});
        var form = {
            closeHour: '15:00',
            openHour: '14:00',
            $invalid: false,
            open: {
                $invalid: false
            },
            close: {
                $invalid: false
            }
        };
        ctrl.overNight = false;

        ctrl.selectDay(ctrl.weekdays[0]);
        ctrl.saveHours(form);

        expect(ctrl.weekdays[0].IsSelected).toEqual(true);
        expect(ctrl.weekdays[0].CloseHour).toEqual(form.closeHour);
        expect(ctrl.weekdays[0].OpenHour).toEqual(form.openHour);
        expect(ctrl.weekdays[0].OverNight).toEqual(false);
        expect(ctrl.selectedDays.length).toEqual(1);
    });

    it('should be able to apply hours and close', function() {
        ctrl = $componentController('workPicker', null, {});
        var form = {
            closeHour: '15:00',
            openHour: '14:00',
            $invalid: false,
            open: {
                $invalid: false
            },
            close: {
                $invalid: false
            }
        };
        ctrl.overNight = false;

        ctrl.selectDay(ctrl.weekdays[0]);
        ctrl.saveAndClose(form);

        expect(ctrl.weekdays[0].IsSelected).toEqual(false);
        expect(ctrl.weekdays[0].CloseHour).toEqual('15:00');
        expect(ctrl.weekdays[0].OpenHour).toEqual('14:00');
        expect(form.closeHour).toEqual('');
        expect(form.openHour).toEqual('');
        expect(ctrl.weekdays[0].OverNight).toEqual(false);
        expect(ctrl.selectedDays.length).toEqual(0);
    });

    it('should be able to remove hours', function() {
        ctrl = $componentController('workPicker', null, {});
        var form = {
            closeHour: '15:00',
            openHour: '14:00',
            $invalid: false,
            open: {
                $invalid: false
            },
            close: {
                $invalid: false
            }
        };
        ctrl.overNight = false;

        ctrl.selectDay(ctrl.weekdays[0]);
        ctrl.saveHours(form);
        ctrl.clearDay(ctrl.weekdays[0]);

        expect(ctrl.weekdays[0].IsSelected).toEqual(true);
        expect(ctrl.weekdays[0].CloseHour).toEqual('');
        expect(ctrl.weekdays[0].OpenHour).toEqual('');
        expect(ctrl.selectedDays.length).toEqual(1);
    });

    it('should be able to apply hours for multiple days', function() {
        ctrl = $componentController('workPicker', null, {});
        var form = {
            closeHour: '15:00',
            openHour: '14:00',
            $invalid: false,
            open: {
                $invalid: false
            },
            close: {
                $invalid: false
            }
        };
        ctrl.overNight = false;
        ctrl.selectDay(ctrl.weekdays[0]);
        ctrl.selectDay(ctrl.weekdays[1]);
        ctrl.saveHours(form);

        expect(ctrl.weekdays[0].IsSelected).toEqual(true);
        expect(ctrl.weekdays[0].CloseHour).toEqual(form.closeHour);
        expect(ctrl.weekdays[0].OpenHour).toEqual(form.openHour);
        expect(ctrl.weekdays[0].OverNight).toEqual(false);
        expect(ctrl.weekdays[1].IsSelected).toEqual(true);
        expect(ctrl.weekdays[1].CloseHour).toEqual(form.closeHour);
        expect(ctrl.weekdays[1].OpenHour).toEqual(form.openHour);
        expect(ctrl.weekdays[1].OverNight).toEqual(false);
        expect(ctrl.selectedDays.length).toEqual(2);
    });

    it('should be able to remove hours for multiple days', function() {
        ctrl = $componentController('workPicker', null, {});
        var form = {
            closeHour: '15:00',
            openHour: '14:00',
            $invalid: false,
            open: {
                $invalid: false
            },
            close: {
                $invalid: false
            }
        };
        ctrl.overNight = false;

        ctrl.selectDay(ctrl.weekdays[0]);
        ctrl.selectDay(ctrl.weekdays[1]);
        ctrl.saveHours(form);
        ctrl.clearDay(ctrl.weekdays[0]);
        ctrl.clearDay(ctrl.weekdays[1]);

        expect(ctrl.weekdays[0].IsSelected).toEqual(true);
        expect(ctrl.weekdays[0].CloseHour).toEqual('');
        expect(ctrl.weekdays[0].OpenHour).toEqual('');
        expect(ctrl.weekdays[1].IsSelected).toEqual(true);
        expect(ctrl.weekdays[1].CloseHour).toEqual('');
        expect(ctrl.weekdays[1].OpenHour).toEqual('');
        expect(ctrl.selectedDays.length).toEqual(2);
    });

    it('should be able to change values for multiple days', function() {
        ctrl = $componentController('workPicker', null, {});
        var form = {
            closeHour: '15:00',
            openHour: '14:00',
            $invalid: false,
            open: {
                $invalid: false
            },
            close: {
                $invalid: false
            }
        };
        var form2 = {
            closeHour: '18:00',
            openHour: '10:00',
            $invalid: false,
            open: {
                $invalid: false
            },
            close: {
                $invalid: false
            }
        };
        ctrl.overNight = true;

        ctrl.selectDay(ctrl.weekdays[0]);
        ctrl.selectDay(ctrl.weekdays[1]);
        ctrl.saveHours(form);
        ctrl.selectDay(ctrl.weekdays[0]);
        ctrl.saveHours(form2);

        expect(ctrl.weekdays[0].IsSelected).toEqual(false);
        expect(ctrl.weekdays[0].CloseHour).toEqual(form.closeHour);
        expect(ctrl.weekdays[0].OpenHour).toEqual(form.openHour);
        expect(ctrl.weekdays[0].OverNight).toEqual(true);
        expect(ctrl.weekdays[1].IsSelected).toEqual(true);
        expect(ctrl.weekdays[1].CloseHour).toEqual(form2.closeHour);
        expect(ctrl.weekdays[1].OpenHour).toEqual(form2.openHour);
        expect(ctrl.weekdays[1].OverNight).toEqual(true);
        expect(ctrl.selectedDays.length).toEqual(1);
    });

    it('should not be able to input start time later than end time', function() {
        ctrl = $componentController('workPicker', null, {});
        var form = {
            closeHour: '13:00',
            openHour: '20:00',
            $invalid: false,
            open: {
                $invalid: false
            },
            close: {
                $invalid: false
            }
        };
        ctrl.overNight = false;

        ctrl.selectDay(ctrl.weekdays[0]);
        ctrl.saveHours(form);

        expect(form.$invalid).toEqual(true);
        expect(ctrl.weekdays[0].CloseHour).toEqual('');
        expect(ctrl.weekdays[0].OpenHour).toEqual('');
    });

    it('should be able to input start time over night', function() {
        ctrl = $componentController('workPicker', null, {});
        var form = {
            closeHour: '13:00',
            openHour: '20:00',
            $invalid: false,
            open: {
                $invalid: false
            },
            close: {
                $invalid: false
            }
        };
        ctrl.overNight = true;
        ctrl.selectDay(ctrl.weekdays[0]);
        ctrl.saveHours(form);

        expect(form.$invalid).toEqual(false);
        expect(ctrl.weekdays[0].CloseHour).toEqual('13:00');
        expect(ctrl.weekdays[0].OpenHour).toEqual('20:00');
    });

    it('should not be able to input empty data', function() {
        ctrl = $componentController('workPicker', null, {});
        var form = {
            closeHour: '',
            openHour: '',
            $invalid: false,
            open: {
                $invalid: false
            },
            close: {
                $invalid: false
            }
        };
        ctrl.overNight = false;

        ctrl.selectDay(ctrl.weekdays[0]);
        ctrl.saveHours(form);

        expect(form.$invalid).toEqual(true);
        expect(ctrl.weekdays[0].CloseHour).toEqual('');
        expect(ctrl.weekdays[0].OpenHour).toEqual('');
    });

    it('should not be able to input incomplete data', function() {
        ctrl = $componentController('workPicker', null, {});
        var form = {
            closeHour: '10:00',
            openHour: '',
            $invalid: false,
            open: {
                $invalid: false
            },
            close: {
                $invalid: false
            }
        };
        ctrl.overNight = false;

        ctrl.selectDay(ctrl.weekdays[0]);
        ctrl.saveHours(form);

        expect(form.$invalid).toEqual(true);
        expect(ctrl.weekdays[0].CloseHour).toEqual('');
        expect(ctrl.weekdays[0].OpenHour).toEqual('');
    });
});

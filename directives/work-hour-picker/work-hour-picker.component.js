(function () {
    'use strict';

    angular.module('wfm.workPicker', ['pascalprecht.translate'])
    .component('workPicker',
    {
        templateUrl: 'directives/work-hour-picker/work-hour-picker.tpl.html',
        controller: whpCtrl,
        bindings: {
            workingHours: '=',
            overNightSwitch: '<',
            timeFormatSwitch: '<'
        }
    });

    whpCtrl.$inject = ['$translate'];

    function whpCtrl($translate) {
        var ctrl = this;

        ctrl.timeFormat = {
            Format: 'HH:mm',
            Meridian: false
        };

        // PM format h:mm a
        ctrl.errorMessage = 'Input is not valid';
        ctrl.selectedDays = [];
        ctrl.overNight = false;
        ctrl.showSummary = false;
        ctrl.weekdays = [{
            Name: $translate.instant('DayOfWeekMonday'),
            UntranslatedName:'xxMonday',
            OverNight: null,
            OpenHour: '',
            CloseHour: '',
            IsSelected: false
        },
        {
            Name: $translate.instant('DayOfWeekTuesday'),
            UntranslatedName:'xxTuesday',
            OverNight: null,
            OpenHour: '',
            CloseHour: '',
            IsSelected: false
        },
        {
            Name: $translate.instant('DayOfWeekWednesday'),
            UntranslatedName:'xxWednesday',
            OverNight: null,
            OpenHour: '',
            CloseHour: '',
            IsSelected: false
        },
        {
            Name: $translate.instant('DayOfWeekThursday'),
            UntranslatedName:'xxThursday',
            OverNight: null,
            OpenHour: '',
            CloseHour: '',
            IsSelected: false
        },
        {
            Name: $translate.instant('DayOfWeekFriday'),
            UntranslatedName:'xxFriday',
            OverNight: null,
            OpenHour: '',
            CloseHour: '',
            IsSelected: false
        },
        {
            Name: $translate.instant('DayOfWeekSaturday'),
            UntranslatedName:'xxSaturday',
            OverNight: null,
            OpenHour: '',
            CloseHour: ''
        },
        {
            Name: $translate.instant('DayOfWeekSunday'),
            UntranslatedName:'xxSunday',
            OverNight: null,
            OpenHour: '',
            CloseHour: ''
        }
    ];

        function toggleSelectedDay(selectedDays, day) {
            var index = ctrl.selectedDays.indexOf(day);
            if (index === -1) {
                ctrl.selectedDays.push(day);
                day.IsSelected = true;
            }
            else {
                ctrl.selectedDays.splice(index,1);
                day.IsSelected = false;
            }
        }

        ctrl.toggleTimeFormat = function () {
            if (ctrl.timeFormat.Meridian) {
                ctrl.timeFormat.Format = 'HH:mm';
                ctrl.timeFormat.Meridian = false;
            }
            else {
                ctrl.timeFormat.Format = 'h:mm a';
                ctrl.timeFormat.Meridian = true;
            }
        }

        ctrl.closeWorkingPicker = function (form) {
            ctrl.selectedDays = [];
            for (var i = 0; i < ctrl.weekdays.length; i++) {
                ctrl.weekdays[i].IsSelected = false;
            }
            form.closeHour = '';
            form.openHour = '';
            form.$invalid = false;
            ctrl.showSummary = false;
        }

        ctrl.clearDay = function(day) {
            day.OpenHour = '',
            day.CloseHour = '';
            day.OverNight = null;
        }

        ctrl.selectDay = function (day) {
            toggleSelectedDay(ctrl.selectedDays, day)
        }

        ctrl.openPicker = function (form) {
            ctrl.showSummary = !ctrl.showSummary;
            if (ctrl.selectedDays.length > 0) {
                ctrl.closeWorkingPicker(form);
            }
        }

        function checkValidTime (form) {
            if (!form.openHour || !form.closeHour) {
                ctrl.errorMessage = $translate.instant('StartTimeAndEndTimeMustBeSet');
                form.$invalid = true;
            }

            if (form.close.$invalid || form.open.$invalid) {
                ctrl.errorMessage = $translate.instant('EnteredTimeIsInvalid');
                form.$invalid = true;
            }

            if (form.openHour > form.closeHour && ctrl.overNight === false) {
                ctrl.errorMessage = $translate.instant('EndTimeMustBeGreaterOrEqualToStartTime');
                form.$invalid = true;
            }
            return form.$invalid;
        }

        ctrl.saveHours = function(form) {
            if (checkValidTime(form)) {
                return;
            }
            for (var i = 0; i < ctrl.weekdays.length; i++) {
                if (ctrl.weekdays[i].IsSelected) {
                    ctrl.weekdays[i].OpenHour = form.openHour;
                    ctrl.weekdays[i].CloseHour = form.closeHour;
                    ctrl.weekdays[i].OverNight = ctrl.overNight;
                }
            }
        }

        ctrl.saveAndClose = function (form) {
            if (!form.$invalid) {
                ctrl.saveHours(form);
                ctrl.closeWorkingPicker(form);
            }
        }

        ctrl.workingHours = ctrl.weekdays;
    }

})();

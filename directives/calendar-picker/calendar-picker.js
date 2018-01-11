(function () {
    'use strict';

    angular
        .module('wfm.calendarPicker')
        .component('wfmCalendarPicker', {
            templateUrl: ['CurrentUserInfo', function (CurrentUserInfo) {
                var dateFormat = CurrentUserInfo.CurrentUserInfo().DateFormatLocale === 'fa-IR' ? 'jalaali' : 'gregorian';
                var templates = {
                    'jalaali': 'directives/calendar-picker/calendar-picker.jalaali.template.tpl.html',
                    'gregorian': 'directives/calendar-picker/calendar-picker.gregorian.template.tpl.html'
                }
                return templates[dateFormat];
            }],
            require: {
                ngModel: 'ngModel'
            },
            controller: 'PpDateRangeController',
            controllerAs: 'vm',
            bindings: {
                showWeek: '<',
                disable: '@',
                intervalRule: '@',
                singleDatePicker: '@',
                customValidate: '&'
            }
        })
        .controller('PpDateRangeController', PpDateRangeController);

    PpDateRangeController.$inject = ['$scope', '$element', '$attrs', '$timeout'];

    function PpDateRangeController($scope, $element, $attrs, $timeout) {
        var vm = this;

        vm.resetStartDate = resetStartDate;
        vm.resetEndDate = resetEndDate;
        vm.resetDate = resetDate;
        vm.hightLightToday = hightLightToday;
        vm.validate = undefined;
        vm.isValid = true;
        vm.pickStartDate = null;
        vm.pickEndDate = null;
        vm.options = {
            customClass: renderRangeDate,
            showWeeks: vm.showWeek
        };

        vm.$onInit = function () {
            switch (vm.singleDatePicker) {
                default:
                    vm.ngModel.$viewChangeListeners.push(onChangeForSingleDatePicker);
                    vm.ngModel.$render = onChangeForSingleDatePicker;
                    initSingleDatePicker();
                    break;
                case undefined:
                    vm.ngModel.$viewChangeListeners.push(onChangeForDateRangePicker);
                    vm.ngModel.$render = onChangeForDateRangePicker;
                    initDateRangePicker();
                    break;
            }
        }

        function initSingleDatePicker() {
            vm.options.customClass = undefined;
            vm.switchDate = selectSingleDate;
            return;
        }

        function initDateRangePicker() {
            switch (vm.disable) {
                default:
                    vm.validate = validateDate;
                    vm.switchDate = switchDateForDateRangePicker;
                    vm.displayCalenderView = displayCalenderViewDefault;
                    break;
                case 'start-date':
                    vm.validate = validateEndDate;
                    vm.switchDate = selectEndDate;
                    vm.displayCalenderView = displayCalenderViewForDisableView;
                    break;
                case 'end-date':
                    vm.validate = validateStartDate;
                    vm.switchDate = selectStartDate;
                    vm.displayCalenderView = displayCalenderViewForDisableView;
                    break;
                case 'all':
                    vm.validate = validateDate;
                    vm.switchDate = undefined;
                    vm.displayCalenderView = displayCalenderViewForDisableView;
                    break;
            }
            vm.isValid = !vm.validate();
            return;
        }

        function hightLightToday() {
            return vm.pickDate = resetHoursToMidnight(new Date());
        }

        function onChangeForDateRangePicker() {
            var oldVal = [angular.copy(vm.pickStartDate), angular.copy(vm.pickEndDate)];
            var newVal = fetchNgModelDateForDateRangePicker();
            return vm.displayCalenderView(oldVal, newVal);
        }

        function fetchNgModelDateForDateRangePicker() {
            var startDate = !vm.ngModel.$modelValue ? null : vm.ngModel.$modelValue.startDate;
            var endDate = !vm.ngModel.$modelValue ? null : vm.ngModel.$modelValue.endDate;
            vm.pickStartDate = resetHoursToMidnight(startDate);
            vm.pickEndDate = resetHoursToMidnight(endDate);
            return [angular.copy(vm.pickStartDate), angular.copy(vm.pickEndDate)];
        }

        function resetHoursToMidnight(inputDate) {
            if (inputDate == null) {
                return null;
            }
            var d = new Date(inputDate).setHours(0, 0, 0, 0);
            return new Date(d);
        }

        function onChangeForSingleDatePicker() {
            return vm.pickDate = !vm.ngModel.$modelValue ? new Date() : vm.ngModel.$modelValue;
        }

        function displayCalenderViewForDisableView(oldVal, newVal) {
            if ((!oldVal[1] || !!(newVal[1] - oldVal[1])) && vm.disable == 'end-date') {
                vm.pickDate = vm.pickStartDate;
            }
            if ((!oldVal[0] || !!(newVal[0] - oldVal[0])) && vm.disable == 'start-date') {
                vm.pickDate = vm.pickEndDate;
            }
            if (vm.disable == 'all') {
                vm.pickDate = vm.pickStartDate;
            }
            return displayDateRange(vm.pickStartDate, vm.pickEndDate);
        }

        function displayCalenderViewDefault(oldVal, newVal) {
            if (!!(newVal[0] - oldVal[0])) {
                vm.pickDate = vm.pickStartDate;
            }
            if (!!(newVal[1] - oldVal[1])) {
                vm.pickDate = vm.pickEndDate;
            }
            return displayDateRange(vm.pickStartDate, vm.pickEndDate);
        }

        function validateDate() {
            if (!vm.pickStartDate && !vm.pickEndDate) {
                return vm.dateRangeText = 'SelectStartDateAndEndDate';
            }
            if (!vm.pickStartDate) {
                return vm.dateRangeText = 'SelectStartDate';
            }
            if (!vm.pickEndDate) {
                return vm.dateRangeText = 'SelectEndDate';
            }
            if (!!$attrs.customValidate) {
                return vm.dateRangeText = vm.customValidate();
            }
            if (vm.pickEndDate - vm.pickStartDate < 0) {
                return vm.dateRangeText = 'ValidateEndDate';
            }
            return vm.dateRangeText = '';
        }

        function validateEndDate() {
            if (!vm.pickEndDate) {
                return vm.dateRangeText = 'SelectEndDate';
            }
            if (!!$attrs.customValidate) {
                return vm.dateRangeText = vm.customValidate();
            }
            if (vm.pickEndDate - vm.pickStartDate <= 0) {
                return vm.dateRangeText = 'ValidateEndDate';
            }
            return vm.dateRangeText = '';
        }

        function validateStartDate() {
            if (!vm.pickStartDate) {
                return vm.dateRangeText = 'SelectStartDate';
            }
            if (!!$attrs.customValidate) {
                return vm.dateRangeText = vm.customValidate();
            }
            if (vm.pickEndDate - vm.pickStartDate <= 0) {
                return vm.dateRangeText = 'ValidateStartDate';
            }
            return vm.dateRangeText = '';
        }

        function resetDate() {
            vm.pickDate = null;
            return vm.ngModel.$setViewValue(vm.pickDate);
        }

        function resetStartDate() {
            vm.pickStartDate = null;
            vm.pickDate = vm.pickStartDate;
            updateNgModelDateForDateRangePicker();
            return vm.isValid = !vm.validate();
        }

        function resetEndDate() {
            vm.pickEndDate = null;
            vm.pickDate = vm.pickEndDate;
            updateNgModelDateForDateRangePicker();
            return vm.isValid = !vm.validate();
        }

        function selectSingleDate() {
            return vm.ngModel.$setViewValue(vm.pickDate);
        }

        function selectStartDate() {
            vm.pickStartDate = vm.pickDate;
            updateNgModelDateForDateRangePicker();
            return displayDateRange(vm.pickStartDate, vm.pickEndDate);
        }

        function selectEndDate() {
            vm.pickEndDate = vm.pickDate;
            updateNgModelDateForDateRangePicker();
            return displayDateRange(vm.pickStartDate, vm.pickEndDate);
        }

        function autoSelectDate() {
            var betweenToStart = moment(vm.pickDate).diff(vm.pickStartDate, 'day');
            var betweenToEnd = moment(vm.pickDate).diff(vm.pickEndDate, 'day');
            if (betweenToStart > 0 && betweenToEnd >= 0 || betweenToStart == 6) {
                return selectEndDate();
            }
            if (betweenToStart <= 0 && betweenToEnd < 0) {
                return selectStartDate();
            }
            if (betweenToStart > 0 && betweenToEnd < 0) {
                if (Math.abs(betweenToStart) >= Math.abs(betweenToEnd)) {
                    return selectEndDate();
                }
                return selectStartDate();
            }
            return;
        }

        function switchDateForDateRangePicker() {
            if (!vm.pickStartDate) {
                return selectStartDate();
            }
            if (!vm.pickEndDate) {
                return selectEndDate();
            }
            if (!!vm.pickStartDate && !!vm.pickStartDate) {
                return autoSelectDate();
            }
            return;
        }

        function generateWeeksOnlyDateRangeInfo(a, b) {
            var a = moment(a).clone();
            var b = moment(b).clone();
            var days = b.add(1, 'day').diff(a, 'day');
            if (days > 6) {
                var week = (days / 7).toString().split('.')[0];
                var day = b.subtract(week * 7, 'day').diff(a, 'day');
            } else {
                var week = 0;
                var day = days;
            }
            return {
                Week: week,
                Day: day
            }
        }

        function generateMonthsOnlyDateRangeInfo(a, b) {
            var a = moment(a).clone();
            var b = moment(b).clone();
            var month = calIntervalOfMonth(a, b);
            var days = b.subtract(month, 'month').diff(a, 'day');
            return {
                Month: month,
                Day: days
            }
        }

        function generateDateRangeInfo(a, b) {
            var a = moment(a).clone();
            var b = moment(b).clone();
            var year = b.diff(a, 'year');
            var month = calIntervalOfMonth(a, b.subtract(year, 'year'));
            var days = b.subtract(month, 'month').diff(a, 'day');
            if (days > 6) {
                var week = (days / 7).toString().split('.')[0];
                var day = b.subtract(week * 7, 'day').diff(a, 'day');
            } else {
                var week = 0;
                var day = days;
            }
            return {
                Year: year,
                Month: month,
                Week: week,
                Day: day
            }
        }

        function calIntervalOfMonth(a, b) {
            var currentMonthOfEndDate = b.get('month');
            if (currentMonthOfEndDate == 1) {
                var startDateOfSameMonthOfStartDate = a.clone().startOf('month');
                var endDateOfSameMonthOfStartDate = a.clone().endOf('month');
                var endDateOfSameMonthOfEndDate = b.clone().endOf('month');
                var dateOfStartDate = a.clone().get('date');
                var dateOfEndDate = b.clone().get('date');
                if ((endDateOfSameMonthOfEndDate.diff(b, 'day') - endDateOfSameMonthOfStartDate.diff(a, 'day') == 1) || (dateOfStartDate - dateOfEndDate == 1) || (startDateOfSameMonthOfStartDate.diff(a, 'day') == 0 && endDateOfSameMonthOfEndDate.diff(b, 'day') == 0)) {
                    return b.add(1, 'day').diff(a, 'month', true).toFixed();
                }
            }
            return b.add(1, 'day').diff(a, 'month');
        }

        function createDateInterval(a, b, type) {
            var text = '';
            if (type == 'week') {
                var dateRangeText = generateWeeksOnlyDateRangeInfo(a, b);
            } else if (type == 'month') {
                var dateRangeText = generateMonthsOnlyDateRangeInfo(a, b);
            } else {
                var dateRangeText = generateDateRangeInfo(a, b);
            }
            var keys = Object.keys(dateRangeText);
            for (var i = 0; i < keys.length; i++) {
                if (dateRangeText[keys[i]] > 0) {
                    text += dateRangeText[keys[i]] + keys[i] + '   ';
                }
            }
            return text;
        }

        function displayDateRange(a, b) {
            vm.isValid = !vm.validate();
            if (vm.isValid) {
                switch (vm.intervalRule) {
                    default:
                        vm.dateRangeText = createDateInterval(a, b);
                        break;
                    case 'week':
                        vm.dateRangeText = createDateInterval(a, b, 'week');
                        break;
                    case 'month':
                        vm.dateRangeText = createDateInterval(a, b, 'month');
                        break;
                }
            }
            return vm.dateRangeText;
        }

        function updateNgModelDateForDateRangePicker() {
            return vm.ngModel.$setViewValue({
                startDate: vm.pickStartDate,
                endDate: vm.pickEndDate
            });
        }

        function renderRangeDate(data) {
            var date = data.date,
                mode = data.mode;
            if (!vm.pickStartDate && !vm.pickEndDate) {
                return '';
            }
            if (mode === 'day' && vm.isValid) {
                if (!moment(date).isBefore(vm.pickStartDate, 'day') && !moment(date).isAfter(vm.pickEndDate, 'day')) {
                    return 'in-date-range';
                }
            }
            return '';
        }
    }
})();

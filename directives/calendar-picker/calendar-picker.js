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
                };
                return templates[dateFormat];
            }],
            require: {
                ngModel: 'ngModel'
            },
            controller: 'DateRangeController',
            controllerAs: 'vm',
            bindings: {
                showWeek: '<',
                disable: '@',
                intervalRule: '@',
                singleDatePicker: '@',
                customValidate: '&'
            }
        })
        .controller('DateRangeController', DateRangeController);

    DateRangeController.$inject = ['$scope', '$element', '$attrs', '$timeout', '$translate'];

    function DateRangeController($scope, $element, $attrs, $timeout, $translate) {
        var vm = this;

        vm.isValid = true;
        vm.pickStartDate = null;
        vm.pickEndDate = null;
        vm.isPickingStartDate = false;
        vm.isPickingEndDate = false;
        vm.isPickingSingleDate = false;

        vm.validate = undefined;
        vm.resetDate = resetDate;
        vm.resetStartDate = resetStartDate;
        vm.resetEndDate = resetEndDate;
        vm.resetStartAndEndDate = resetStartAndEndDate;

        vm.selectToday = selectToday;
        vm.startToSelectStartDate = startToSelectStartDate;
        vm.startToSelectEndDate = startToSelectEndDate;

        vm.options = {
            customClass: renderDatesInRange,
            showWeeks: vm.showWeek
        };

        vm.$onInit = function () {
            switch (vm.singleDatePicker) {
                case undefined:
                    vm.ngModel.$viewChangeListeners.push(onChangeForDateRangePicker);
                    vm.ngModel.$render = onChangeForDateRangePicker;
                    initDateRangePicker();
                    break;
                default:
                    initSingleDatePicker();
                    break;
            }
        };

        function initSingleDatePicker() {
            vm.options.customClass = undefined;
            vm.switchDate = selectSingleDate;
            vm.validate = validateSingleDate;
            vm.isPickingSingleDate = true;

            vm.pickDate = vm.ngModel.$modelValue || new Date();

            return;
        }

        function initDateRangePicker() {
            switch (vm.disable) {
                case 'start-date':
                    vm.validate = validateEndDate;
                    vm.switchDate = selectEndDate;
                    vm.displayCalenderView = displayCalenderViewForDisableView;
                    vm.isPickingEndDate = true;
                    break;
                case 'end-date':
                    vm.validate = validateStartDate;
                    vm.switchDate = selectStartDate;
                    vm.displayCalenderView = displayCalenderViewForDisableView;
                    vm.isPickingStartDate = true;
                    break;
                case 'all':
                    vm.validate = validateNoneDate;
                    vm.switchDate = undefined;
                    vm.displayCalenderView = displayCalenderViewForDisableView;
                    break;
                default:
                    vm.validate = validateStartAndEndDate;
                    vm.switchDate = switchDateForDateRangePicker;
                    vm.displayCalenderView = displayCalenderViewDefault;
                    vm.isPickingStartDate = true;
                    vm.pickDate = vm.ngModel.$modelValue.startDate || new Date();
                    break;
            }
            vm.isValid = !vm.validate();
            return;
        }

        function selectToday() {
            vm.pickDate = resetHoursToMidnight(new Date());

            if (vm.isPickingStartDate) {
                vm.pickStartDate = vm.pickDate;
            }

            if (vm.isPickingEndDate) {
                vm.pickEndDate = vm.pickDate;
            }

            if (vm.isPickingStartDate || vm.isPickingEndDate) {
                updateNgModelDateForDateRangePicker();
            }

            if (vm.isPickingSingleDate) {
                vm.ngModel.$setViewValue(vm.pickDate);
            }

            return vm.isValid = !vm.validate();
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

        function validateSingleDate() {
            if (!vm.pickDate) {
                return vm.dateRangeText = $translate.instant('SelectADate');
            }
            if (!!$attrs.customValidate) {
                return vm.dateRangeText = vm.customValidate();
            }
            return vm.dateRangeText = '';
        }

        function validateStartAndEndDate() {
            if (!vm.pickStartDate && !vm.pickEndDate) {
                return vm.dateRangeText = $translate.instant('SelectStartDateAndEndDate');
            }
            if (!vm.pickStartDate) {
                return vm.dateRangeText = $translate.instant('SelectStartDate');
            }
            if (!vm.pickEndDate) {
                return vm.dateRangeText = $translate.instant('SelectEndDate');
            }
            if (vm.pickEndDate - vm.pickStartDate < 0) {
                return vm.dateRangeText = $translate.instant('StartDateMustBeEqualToOrEarlierThanEndDate');
            }
            if (!!$attrs.customValidate) {
                return vm.dateRangeText = vm.customValidate();
            }
            return vm.dateRangeText = '';
        }

        function validateNoneDate() {
            if (!vm.pickStartDate && !vm.pickEndDate) {
                return vm.dateRangeText = $translate.instant('NoStartAndEndDateToDisplay');
            }
            if (!vm.pickStartDate) {
                return vm.dateRangeText = $translate.instant('NoStartDateToDisplay');
            }
            if (!vm.pickEndDate) {
                return vm.dateRangeText = $translate.instant('NoEndToDisplay');
            }
            if (vm.pickEndDate - vm.pickStartDate < 0) {
                return vm.dateRangeText = $translate.instant('StartDateMustBeEqualToOrEarlierThanEndDate');
            }
            if (!!$attrs.customValidate) {
                return vm.dateRangeText = vm.customValidate();
            }
            return vm.dateRangeText = '';
        }

        function validateEndDate() {
            if (!vm.pickEndDate) {
                return vm.dateRangeText = $translate.instant('SelectEndDate');
            }
            if (vm.pickEndDate - vm.pickStartDate < 0) {
                return vm.dateRangeText = $translate.instant('StartDateMustBeEqualToOrEarlierThanEndDate');
            }
            if (!!$attrs.customValidate) {
                return vm.dateRangeText = vm.customValidate();
            }
            return vm.dateRangeText = '';
        }

        function validateStartDate() {
            if (!vm.pickStartDate) {
                return vm.dateRangeText = $translate.instant('SelectStartDate');
            }
            if (vm.pickEndDate - vm.pickStartDate < 0) {
                return vm.dateRangeText = $translate.instant('StartDateMustBeEqualToOrEarlierThanEndDate');
            }
            if (!!$attrs.customValidate) {
                return vm.dateRangeText = vm.customValidate();
            }
            return vm.dateRangeText = '';
        }

        function resetDate() {
            vm.pickDate = null;
            return vm.ngModel.$setViewValue(vm.pickDate);
        }

        function resetStartDate() {
            vm.pickStartDate = null;
            vm.pickDate = vm.ngModel.$modelValue.startDate || new Date();

            updateNgModelDateForDateRangePicker();
            return vm.isValid = !vm.validate();
        }

        function resetEndDate() {
            vm.pickEndDate = null;
            vm.pickDate = vm.ngModel.$modelValue.endDate || new Date();

            updateNgModelDateForDateRangePicker();
            return vm.isValid = !vm.validate();
        }

        function resetStartAndEndDate() {
            vm.pickStartDate = null;
            vm.pickEndDate = null;
            vm.pickDate = null;

            updateNgModelDateForDateRangePicker();
            return vm.isValid = !vm.validate();
        }

        function startToSelectStartDate() {
            if (vm.disable == 'start-date' || vm.disable == 'all') {
                return;
            }
            vm.isPickingStartDate = true;
            vm.isPickingEndDate = false;
            vm.pickDate = vm.pickStartDate;
            updateNgModelDateForDateRangePicker();

            return vm.isValid = !vm.validate();
        }

        function startToSelectEndDate() {
            if (vm.disable == 'end-date' || vm.disable == 'all') {
                return;
            }
            vm.isPickingStartDate = false;
            vm.isPickingEndDate = true;
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

        function switchDateForDateRangePicker() {
            if (vm.isPickingStartDate) {
                return selectStartDate();
            }
            if (vm.isPickingEndDate) {
                return selectEndDate();
            }
            return;
        }

        function generateWeeksOnlyDateRangeInfo(a, b) {
            var a = moment(a).clone();
            var b = moment(b).clone();
            var days = b.add(1, 'day').diff(a, 'day');
            var weeks = 0;

            if (days > 6) {
                weeks = (days / 7).toString().split('.')[0];
                days = b.subtract(weeks * 7, 'day').diff(a, 'day');
            } else {
                weeks = 0;
            }

            return {
                Weeks: weeks,
                Days: days
            };
        }

        function generateMonthsOnlyDateRangeInfo(a, b) {
            var a = moment(a).clone();
            var b = moment(b).clone();
            var months = calIntervalOfMonth(a, b);
            var days = b.subtract(months, 'month').diff(a, 'day');

            return {
                Months: months,
                Days: days
            };
        }

        function generateDateRangeInfo(a, b) {
            var a = moment(a).clone();
            var b = moment(b).clone();
            var years = b.diff(a, 'year');
            var months = calIntervalOfMonth(a, b.subtract(years, 'year'));
            var days = b.subtract(months, 'month').diff(a, 'day');
            var weeks = 0;

            if (days > 6) {
                weeks = (days / 7).toString().split('.')[0];
                days = b.subtract(weeks * 7, 'day').diff(a, 'day');
            } else {
                weeks = 0;
            }
            return {
                Years: years,
                Months: months,
                Weeks: weeks,
                Days: days
            };
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
                    text += dateRangeText[keys[i]] + $translate.instant(keys[i]) + '   ';
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

        function renderDatesInRange(data) {
            var date = data.date,
                mode = data.mode;

            if (!vm.pickStartDate && !vm.pickEndDate) {
                return '';
            }

            if (mode === 'day') {
                var classStr = '';

                var inStartAndEndRange = moment(date).isSameOrAfter(vm.pickStartDate, 'day') && moment(date).isSameOrBefore(vm.pickEndDate, 'day');

                var isStartDate = moment(date).isSame(vm.pickStartDate, 'day');
                var isEndDate = moment(date).isSame(vm.pickEndDate, 'day');

                if (isStartDate || isEndDate || inStartAndEndRange) {
                    classStr += ' in-date-range';
                }

                if (isStartDate) {
                    classStr += ' start-date-cell';
                }

                if (isEndDate) {
                    classStr += ' end-date-cell';
                }

                return classStr;
            }
        }
    }
})();

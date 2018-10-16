(function() {
	'use strict';

	angular
		.module('wfm.datePicker')
		.component('wfmDatePicker', {
			templateUrl: [
				'CurrentUserInfo',
				function(CurrentUserInfo) {
					if (CurrentUserInfo.CurrentUserInfo().DateFormatLocale === 'fa-IR')
						return 'directives/wfm-date-picker/wfm-date-picker.jalaali.tpl.html';
					return 'directives/wfm-date-picker/wfm-date-picker.gregorian.tpl.html';
				}
			],
			require: {
				ngModel: 'ngModel'
			},
			controller: 'wfmDatePickerController',
			controllerAs: 'vm',
			bindings: {
				showWeek: '<?',
				disable: '@?',
				customValidate: '&?',
				onDateChange: '&?',
				popupMode: '<?'
			}
		})
		.controller('wfmDatePickerController', wfmDatePickerController);

	wfmDatePickerController.$inject = ['$attrs', '$translate'];

	function wfmDatePickerController($attrs, $translate) {
		var vm = this;

		vm.isValid = true;
		vm.dateValiationText = '';
		vm.isShowingDatePicker = false;

		vm.options = {
			customClass: renderDatesInRange,
			showWeeks: !!vm.showWeek
		};

		vm.$onInit = function() {
			vm.pickDate = vm.ngModel.$modelValue || new Date();

			vm.ngModel.$viewChangeListeners.push(onChangeForDatePicker);
			vm.ngModel.$render = onChangeForDatePicker;
		};

		vm.switchDate = function() {
			vm.ngModel.$setViewValue(vm.pickDate);
			validatePickDate();
		};

		vm.resetDate = function() {
			vm.pickDate = null;
			return vm.ngModel.$setViewValue(vm.pickDate);
		};

		vm.toggleDatePicker = function(event) {
			event && event.preventDefault();
			event && event.stopPropagation();
			vm.isShowingDatePicker = !vm.isShowingDatePicker;
		};

		vm.gotoPreviousDate = function() {
			vm.pickDate = moment(vm.pickDate).add(-1, 'days');
			vm.switchDate();
		};

		vm.gotoNextDate = function() {
			vm.pickDate = moment(vm.pickDate).add(1, 'days');
			vm.switchDate();
		};

		vm.selectToday = function() {
			vm.pickDate = resetHoursToMidnight(new Date());

			vm.switchDate();
		};

		function onChangeForDatePicker() {
			var date = vm.ngModel.$modelValue || null;
			vm.pickDate = resetHoursToMidnight(date);

			validatePickDate();
			vm.onDateChange && vm.onDateChange(vm.pickDate);
		}

		function validatePickDate() {
			if (!vm.pickDate) {
				vm.dateValiationText = $translate.instant('SelectADate');
			}
			if (!!$attrs.customValidate) {
				vm.dateValiationText = vm.customValidate(vm.pickDate);
			} else {
				vm.dateValiationText = '';
			}

			if (!vm.dateValiationText || vm.dateValiationText.length == 0) {
				vm.isValid = true;
			} else {
				vm.isValid = false;
			}
		}

		function resetHoursToMidnight(inputDate) {
			if (inputDate == null) {
				return null;
			}
			var d = new Date(inputDate).setHours(0, 0, 0, 0);
			return new Date(d);
		}

		function renderDatesInRange(data) {
			var date = data.date,
				classStr = '';

			if (moment(date).isSame(vm.pickDate, 'day')) {
				classStr += ' selected-date-cell';
			}
			if (isCurrentDate(date)) {
				classStr += ' current-date-cell';
			}
			return classStr;
		}

		function isCurrentDate(date) {
			return moment(date).isSame(new Date(), 'day');
		}
	}
})();

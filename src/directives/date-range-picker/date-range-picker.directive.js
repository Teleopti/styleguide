(function() {
	'use strict';

	angular
		.module('wfm.oldDateRangePicker', ['styleguide.templates', 'persianDate', 'wfm.helpingDirectives'])
		.directive('dateRangePicker', ['$locale', '$filter', '$parse', dateRangePicker]);

	function dateRangePicker($locale, $filter, $parse) {
		return {
			templateUrl: 'directives/date-range-picker/date-range-picker.tpl.html',
			scope: {
				templateType: '=?',
				customValidators: '=?',
				testStopUi: '@?',
				onPopUpClose: '&?'
			},
			controller: ['$scope', '$element', '$animate', 'CurrentUserInfo', dateRangePickerCtrl],
			require: ['ngModel', 'dateRangePicker'],
			link: postlink
		};

		function dateRangePickerCtrl(scope, $element, $animate, CurrentUserInfo) {
			/* jshint validthis: true */
			var ctrl = this;
			$element.addClass('date-range-picker-wrap');
			$animate.enabled($element, false);

			var dateFormat = CurrentUserInfo.CurrentUserInfo().DateFormatLocale;
			scope.isJalaali = dateFormat === 'fa-IR' ? true : false;
			scope.isGregorian = !scope.isJalaali;
		}

		function postlink(scope, elem, attrs, ctrls) {
			var ngModelCtrl = ctrls[0],
				dateRangeCtrl = ctrls[1],
				translations = {};

			if (attrs.translations) {
				translations = $parse(attrs.translations)(scope.$parent) || translations;
			}

			scope.xxFrom = translations.From || 'From';
			scope.xxTo = translations.To || 'To';

			scope.displayPopup = function() {
				return scope.templateType === 'popup';
			};
			scope.displayCalendars = false;
			scope.displayError = displayError;
			scope.hideDateRangePicker = hideDateRangePicker;

			popupSetup(scope);

			scope.dateFormat = $locale.DATETIME_FORMATS.shortDate;

			scope.datepickerOptions = {
				customClass: getDayClass,
				showWeeks: true
			};

			scope.defaultValidators = [
				{
					key: 'order',
					message: attrs.invalidOrderMessage || 'StartDateMustBeEqualToOrEarlierThanEndDate',
					validate: _validateStartAndEndByOrder
				},
				{
					key: 'parse',
					message: attrs.invalidEmptyMessage || 'StartDateAndEndDateMustBeSet'
				}
			];

			scope.validators = scope.defaultValidators.concat(
				scope.customValidators && angular.isArray(scope.customValidators) ? scope.customValidators : []
			);

			angular.forEach(scope.validators, function(v) {
				ngModelCtrl.$validators[v.key] = buildValidator(v.validate);
			});

			ngModelCtrl.$parsers.push(parseView);
			ngModelCtrl.$render = render;

			scope.$watchCollection(
				function() {
					if (!scope.startDate || !scope.endDate) {
						return [null, null];
					}
					return [
						$filter('date')(scope.startDate, 'yyyy-MM-dd'),
						$filter('date')(scope.endDate, 'yyyy-MM-dd')
					];
				},
				function(v) {
					if (scope.testStopUi) {
						return;
					}
					updateViewModelFromUi();
					hidePopup();
					refreshDatepickers();
				}
			);

			scope.$watch(
				function() {
					if (scope.dropDownState) {
						return scope.dropDownState.showStartDatePicker && scope.dropDownState.showEndDatePicker;
					}
					return null;
				},
				function(v) {
					if (v !== null) {
						scope.dropDownState.showAllDatePickers = v;
					}
				}
			);

			function displayError(errorKey) {
				return ngModelCtrl.$error && ngModelCtrl.$error[errorKey];
			}

			function hideDateRangePicker() {
				var activeSelect = document.getElementsByClassName('md-select-menu-container md-active');
				if (activeSelect.length > 0) {
					activeSelect[0].remove();
				}

				var selectBackdrop = document.getElementsByClassName('md-select-backdrop');
				if (selectBackdrop.length > 0) {
					selectBackdrop[0].remove();
				}

				var scrollMask = document.getElementsByClassName('md-scroll-mask');
				if (scrollMask.length > 0) {
					scrollMask[0].remove();
				}
				scope.displayCalendars = false;
				scope.onPopUpClose && scope.onPopUpClose();
			}

			function buildValidator(validateStartAndEnd) {
				return function(modelValue, viewValue) {
					if (modelValue === undefined) {
						return true;
					}

					if (!validateStartAndEnd) {
						return true;
					}

					if (modelValue === null) {
						return false;
					}

					return validateStartAndEnd(modelValue.startDate, modelValue.endDate);
				};
			}

			function _validateStartAndEndByOrder(startDate, endDate) {
				return startDate <= endDate;
			}

			function render() {
				if (ngModelCtrl.$viewValue) {
					scope.startDate = ngModelCtrl.$viewValue.startDate;
					scope.endDate = ngModelCtrl.$viewValue.endDate;
				}
			}

			function parseView(viewValue) {
				if (!viewValue) {
					return undefined;
				}

				if (!(scope.startDate && angular.isDate(scope.startDate))) {
					return undefined;
				}

				if (!(scope.endDate && angular.isDate(scope.endDate))) {
					return undefined;
				}
				return viewValue;
			}

			function updateViewModelFromUi() {
				ngModelCtrl.$setViewValue({
					startDate: scope.startDate,
					endDate: scope.endDate
				});
			}

			function hidePopup() {
				if (scope.dropDownState) {
					if (!scope.dropDownState.showAllDatePickers) {
						scope.dropDownState.showStartDatePicker = false;
						scope.dropDownState.showEndDatePicker = false;
					}
				}
			}

			function refreshDatepickers() {
				if (!scope.startDate || !scope.endDate) {
					return;
				}
				scope.startDate = moment(scope.startDate).toDate();
				scope.endDate = moment(scope.endDate).toDate();
			}

			function getDayClass(data) {
				var date = data.date,
					mode = data.mode;

				if (ngModelCtrl.$invalid) {
					return '';
				}

				if (mode === 'day') {
					if (!moment(date).isBefore(scope.startDate, 'day') && !moment(date).isAfter(scope.endDate, 'day')) {
						return 'in-date-range';
					}
				}
				return '';
			}
		}

		function popupSetup(scope) {
			scope.dropDownState = {
				showAllDatePickers: false,
				showStartDatePicker: false,
				showEndDatePicker: false
			};

			scope.onClickShowAllDates = function() {
				if (!scope.dropDownState.showAllDatePickers) {
					scope.dropDownState.showStartDatePicker = scope.dropDownState.showEndDatePicker = scope.dropDownState.showAllDatePickers = true;
				}
			};
		}
	}
})();

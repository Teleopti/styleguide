(function() {

    'use strict';

    angular.module('wfm.daterangepicker', ['styleguide.templates'])
           .directive('dateRangePicker', ['$locale', '$filter', dateRangePicker]);

    function dateRangePicker($locale, $filter) {
        return {
            templateUrl: 'directives/date-range-picker/date-range-picker.tpl.html',
            scope: {
                'templateType': '=?',
                'customValidators': '=?',
                'testStopUi': '@?'
            },
            controller: ['$element', '$animate', dateRangePickerCtrl],
            require: ['ngModel', 'dateRangePicker'],
            link: postlink
        };

        function dateRangePickerCtrl($element, $animate) {
            /* jshint validthis: true */
            var ctrl = this;
            $element.addClass('wfm-date-range-picker-wrap');
            $animate.enabled($element, false);
        }

        function postlink(scope, elem, attrs, ctrls) {
            var ngModelCtrl = ctrls[0],
                dateRangeCtrl = ctrls[1];

            scope.dummyMinDate = new Date('1970-01-01');
            scope.displayPopup = function() {
                return scope.templateType === 'popup';
            };
            scope.displayError = displayError;

            popupSetup(scope);

            scope.dateFormat = $locale.DATETIME_FORMATS.shortDate;

            scope.setRangeClass = setRangeClass;

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
                scope.customValidators && angular.isArray(scope.customValidators) ? scope.customValidators : []);

            angular.forEach(scope.validators, function(v) {
                ngModelCtrl.$validators[v.key] = buildValidator(v.validate);
            });

            ngModelCtrl.$parsers.push(parseView);
            ngModelCtrl.$render = render;

            scope.$watchCollection(function() {
                if (!scope.startDate || !scope.endDate)  {
                    return [null, null];
                }
                return [
                  $filter('date')(scope.startDate, 'yyyy-MM-dd'),
                  $filter('date')(scope.endDate, 'yyyy-MM-dd')
                ];
            }, function(v) {

                if (scope.testStopUi) {return;}
                updateViewModelFromUi();
                hidePopup();
                refreshDatepickers();
            });

            scope.$watch(function() {
                if (scope.dropDownState) {
                    return scope.dropDownState.showStartDatePicker && scope.dropDownState.showEndDatePicker;
                }
                return null;
            }, function(v) {
                if (v !== null) {scope.dropDownState.showAllDatePickers = v;}
            });

            function displayError(errorKey) {
                return ngModelCtrl.$error && ngModelCtrl.$error[errorKey];
            }

            function buildValidator(validateStartAndEnd) {
                return function (modelValue, viewValue) {
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
                if (!scope.startDate || !scope.endDate) {return;}
                scope.dummyMinDate = new Date('1970-01-01');
            }

            function setRangeClass(date, mode) {
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
                showAllDatePickers : false,
                showStartDatePicker: false,
                showEndDatePicker: false
            };

            scope.onClickShowAllDates = function () {
                if (!scope.dropDownState.showAllDatePickers) {
                    scope.dropDownState.showStartDatePicker = scope.dropDownState.showEndDatePicker = scope.dropDownState.showAllDatePickers = true;
                }
                else {
                    scope.dropDownState.showStartDatePicker = scope.dropDownState.showEndDatePicker = scope.dropDownState.showAllDatePickers = false;
                }
            };
        }
    }

})();

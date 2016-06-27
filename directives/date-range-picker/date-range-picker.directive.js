(function() {

    'use strict';

    angular.module('wfm.daterangepicker', ['styleguide.templates'])
           .directive('dateRangePicker', ['$locale', '$filter', dateRangePicker]);

    function dateRangePicker($locale, $filter) {
        return {
            templateUrl: 'directives/date-range-picker/date-range-picker.tpl.html',
            scope: {
                'templateType': '=?',
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
            scope.notEqual = attrs.mustBeEqualMsg;
            scope.noStart = attrs.startAndEndMsg;

            scope.dummyMinDate = new Date('1970-01-01');
            scope.displayPopup = function() {
                return scope.templateType === 'popup';
            };

            popupSetup(scope);

            scope.dateFormat = $locale.DATETIME_FORMATS.shortDate;

            scope.setRangeClass = setRangeClass;

            ngModelCtrl.$validators.empty = validateByValidDates;
            ngModelCtrl.$validators.order = validateByValidOrder;
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

            function validateByValidDates(modelValue, viewValue) {

                if (modelValue && angular.isDate(modelValue.startDate) && angular.isDate(modelValue.endDate)) {
                    return true;
                }
                return false;
            }

            function validateByValidOrder(modelValue, viewValue) {
                if (validateByValidDates(modelValue, viewValue)) {
                    return modelValue.startDate <= modelValue.endDate;
                }
                return true;
            }

            function render() {
                if (ngModelCtrl.$viewValue) {
                    scope.startDate = ngModelCtrl.$viewValue.startDate;
                    scope.endDate = ngModelCtrl.$viewValue.endDate;
                }
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
                if (!scope.startDate || !scope.endDate || moment(scope.startDate).isAfter(scope.endDate, 'day')) {
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
            };
        }
    }

})();

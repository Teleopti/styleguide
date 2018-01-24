(function () {

    'use strict';

    angular.module('wfm.timerangepicker', ['pascalprecht.translate'])
        .directive('timepickerWrap', ['$locale', timepickerWrap])
        .directive('timeRangePicker', ['$filter', timeRangePicker]);

    var defaultTemplate = 'directives/time-range-picker/time-range-picker.tpl.html';

    function timeRangePicker($filter) {
        return {
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || defaultTemplate;
            },
            scope: {
                disableNextDay: '=?',
                maxHoursRange: '=?'
            },
            controller: ['$scope', '$element', '$translate', timeRangePickerCtrl],
            require: ['ngModel', 'timeRangePicker'],
            transclude: true,
            link: postlink
        };

        function timeRangePickerCtrl($scope, $element, $translate) {

            /* jshint validthis: true */

            var vm = this;
            $element.addClass('wfm-time-range-picker-wrap');

            function format(target, arg) {
                return target.replace('{0}', arg);
            }

            $scope.toggleNextDay = toggleNextDay;
            //$scope.invalidTimeRange = 'The period cannot exceed 24 hours.'; //$translate('InvalidHoursRange');
            $scope.invalidTimeRange = format($translate.instant('InvalidHoursRange'), $scope.maxHoursRange);

            vm.mutateMoment = mutateMoment;
            vm.sameDate = sameDate;

            function toggleNextDay() {
                if (!$scope.disableNextDay) {
                    $scope.nextDay = !$scope.nextDay;
                }
            }

            function mutateMoment(mDate, date) {
                var hour = date.getHours(),
                    minute = date.getMinutes();

                mDate.set('hour', hour).set('minute', minute);
            }

            function sameDate(date1, date2) {
                return date1.toLocaleDateString() === date2.toLocaleDateString();
            }
        }

        function postlink(scope, elem, attrs, ctrls) {
            var ngModel = ctrls[0],
                timeRangeCtrl = ctrls[1];

            scope.$watch(watchUIChange, respondToUIChange, true);

            ngModel.$parsers.push(parseView);
            ngModel.$formatters.push(formatModel);
            ngModel.$render = render;
            ngModel.$validators.order = validateCorrectOrder;
            ngModel.$validators.range = validateRange;

            function formatModel(modelValue) {
                if (!modelValue) {
                    return undefined;
                }

                var nextDay =
                    !timeRangeCtrl.sameDate(modelValue.startTime, modelValue.endTime);

                var viewModel = makeViewValue(
                    modelValue.startTime, modelValue.endTime, nextDay);

                return viewModel;
            }

            function parseView(viewValue) {
                if (!viewValue) {
                    return undefined;
                }

                return {
                    startTime: viewValue.startTime.toDate(),
                    endTime: viewValue.endTime.toDate()
                };
            }

            function render() {
                if (!ngModel.$viewValue) {
                    return;
                }

                var mStartTime = ngModel.$viewValue.startTime,
                    mEndTime = ngModel.$viewValue.endTime;

                scope.startTime = mStartTime.toDate();
                scope.endTime = mEndTime.toDate();
                scope.nextDay = !mStartTime.isSame(mEndTime, 'day');
            }

            function validateCorrectOrder(modelValue, viewValue) {
                if (modelValue === undefined) {
                    return true;
                }
                return modelValue.startTime <= modelValue.endTime;
            }

            function validateRange(modelValue, viewValue) {
                if (modelValue === undefined || scope.maxHoursRange === undefined || scope.maxHoursRange === '') {
                    return true;
                }

                return modelValue.endTime - modelValue.startTime < parseInt(scope.maxHoursRange) * 1000 * 60 * 60;
            }

            function makeViewValue(startTime, endTime, nextDay) {
                var viewValue = {
                    startTime: moment(),
                    endTime: moment()
                };

                timeRangeCtrl.mutateMoment(viewValue.startTime, startTime);
                timeRangeCtrl.mutateMoment(viewValue.endTime, endTime);

                if (nextDay) {
                    viewValue.endTime.add(1, 'day');
                }

                return viewValue;
            }

            function respondToUIChange(change, old) {
                if (!scope.startTime || !scope.endTime) {
                    ngModel.$setViewValue(null);
                    return;
                }

                if (scope.disableNextDay) {
                    scope.nextDay = change.strEndTime === '00:00';
                }

                ngModel.$setViewValue(
                    makeViewValue(scope.startTime, scope.endTime, scope.nextDay));
            }

            function watchUIChange() {
                return {
                    strStartTime: scope.startTime ? $filter('date')(scope.startTime, 'HH:mm') : '',
                    strEndTime: scope.endTime ? $filter('date')(scope.endTime, 'HH:mm') : '',
                    boolNextDay: scope.nextDay
                };
            }
        }
    }

    function timepickerWrap($locale) {
        var meridianInfo = getMeridiemInfoByLocale($locale);

        return {
            template: '<div uib-timepicker></div>',
            controller: ['$scope', timepickerWrapCtrl],
            compile: compileFn
        };

        function compileFn(tElement, tAttributes) {
            var binding = tAttributes.ngModel;
            tElement.addClass('wfm-timepicker-wrap');

            var cellElement = tElement.find('timepicker');
            cellElement.attr('ng-model', binding);
            cellElement.attr('show-meridian', 'showMeridian');
            cellElement.attr('minute-step', 'minuteStep');

            if (meridianInfo.showMeridian) {
                cellElement.attr('meridians', 'meridians');
            }
        }

        function timepickerWrapCtrl($scope) {
            $scope.showMeridian = meridianInfo.showMeridian;
            $scope.minuteStep = 5;

            if (meridianInfo.showMeridian) {
                $scope.meridians = [meridianInfo.am, meridianInfo.pm];
            }
        }

    }

    function getMeridiemInfoByLocale($locale) {
        var timeFormat = $locale.DATETIME_FORMATS.shortTime;
        var info = {};

        if (/h:/.test(timeFormat)) {
            info.showMeridian = true;
            info.am = $locale.DATETIME_FORMATS.AMPMS[0];
            info.pm = $locale.DATETIME_FORMATS.AMPMS[1];
        } else {
            info.showMeridian = false;
        }

        return info;
    }

})();

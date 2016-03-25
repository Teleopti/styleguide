(function() {

    'use strict';

    angular.module('wfm.timerangepicker', [])
           .directive('timepickerWrap', [timepickerWrap])
           .directive('timeRangePicker', ['$filter', timeRangePicker]);

    function timeRangePicker($filter) {
        return {
            templateUrl: 'directives/time-range-picker/time-range-picker.tpl.html',
            scope: {
                disableNextDay: '=?'
            },
            controller: ['$scope', '$element', timeRangePickerCtrl],
            require: ['ngModel', 'timeRangePicker'],
            transclude: true,
            link: postlink
        };

        function timeRangePickerCtrl($scope, $element) {

            /* jshint validthis: true */

            var vm = this;
            $element.addClass('wfm-time-range-picker-wrap');

            $scope.toggleNextDay = toggleNextDay;

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
                scope.nextDay = mStartTime.isSame(mEndTime, 'day');
            }

            function validateCorrectOrder(modelValue, viewValue) {
                if (modelValue === undefined) {
                    return true;
                }
                return modelValue.startTime <= modelValue.endTime;
            }

            function makeViewValue(startTime, endTime, nextDay) {
                var viewValue = {
                    startTime: moment(),
                    endTime: moment()
                };

                timeRangeCtrl.mutateMoment(viewValue.startTime, startTime);
                timeRangeCtrl.mutateMoment(viewValue.endTime, endTime);

                if (nextDay) {
                    viewValue.endTime.add('day', 1);
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

    function timepickerWrap() {

        var meridianInfo = getMeridiemInfoFromMoment();

        return {
            template: '<timepicker></timepicker>',
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

    function getMeridiemInfoFromMoment() {
        var timeFormat = moment.localeData()._longDateFormat.LT;
        var info = {};

        if (/h:/.test(timeFormat)) {
            info.showMeridian = true;
            info.am = moment.localeData().meridiem(9, 0);
            info.pm = moment.localeData().meridiem(15, 0);
        } else {
            info.showMeridian = false;
        }

        return info;
    }

})();

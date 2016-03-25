(function() {

    'use strict';

    angular.module('wfm.timerangepicker', [])
           .directive('timepickerWrap', [timepickerWrap])
           .directive('timeRangePicker', ['$filter', timeRangePicker]);

    function timeRangePicker($filter) {
        return {
            template: getHtmlTemplate(),
            scope: {
                disableNextDay: '=?',
                errors: '=?',
                hideMessage: '=?'
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
            $scope.startTime = new Date('2015-01-01 08:00:00');
            $scope.endTime = new Date('2015-01-01 17:00:00');

            function toggleNextDay() {
                if (!$scope.disableNextDay) {
                    $scope.nextDay = !$scope.nextDay;
                }
            }
        }

        function postlink(scope, elem, attrs, ctrls) {
            var ngModel = ctrls[0],
                timeRangeCtrl = ctrls[1];

            scope.$watch(watchUIChange, respondToUIChange);

            ngModel.$parsers.push(parseView);
            ngModel.$formatters.push(formatModel);
            ngModel.$render = render;
            ngModel.$validators.order = validateCorrectOrder;
            ngModel.$validators.empty = validateNonEmpty;

            function formatModel(modelValue) {
                if (!modelValue) {
                    return undefined;
                }
                var endOnNextDay = moment(modelValue.startTime).isSame(modelValue.endTime, 'day');
                return {
                    startTime: modelValue.startTime,
                    endTime: modelValue.endTime,
                    endOnNextDay: endOnNextDay
                };
            }

            function parseView(viewValue) {
                if (!viewValue) {
                    return undefined;
                }

                var mEndTime = moment(viewValue.endTime);
                var mNormalizedEndTime = viewValue.endOnNextDay ?
                  moment(viewValue.startTime).add(1, 'day') : moment(viewValue.startTime);

                mNormalizedEndTime
                  .set('hour', mEndTime.get('hour'))
                  .set('minute', mEndTime.get('minute'));

                return {
                    startTime: viewValue.startTime,
                    endTime: mNormalizedEndTime.toDate()
                };
            }

            function render() {
                scope.startTime = ngModel.$viewValue.startTime;
                scope.endTime = ngModel.$viewValue.endTime;
                scope.nextDay = ngModel.$viewValue.endOnNextDay;
            }

            function validateCorrectOrder(modelValue, viewValue) {
                if (modelValue === undefined) {
                    return true;
                }
                return !moment(modelValue.startTime).isAfter(modelValue.endTime);
            }

            function validateNonEmpty(modelValue, viewValue) {
                if (viewValue === undefined) {
                    return false;
                }
                return viewValue.startTime && viewValue.endTime;
            }

            function respondToUIChange(change) {
                if (scope.disableNextDay) {
                    scope.nextDay = change.strEndTime === '00:00';
                }
                ngModel.$setViewValue({
                    startTime: scope.startTime,
                    endTime: scope.endTime,
                    endOnNextDay: scope.nextDay
                });
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

    function getHtmlTemplate() {
        return '<div>' +
          ' <table> ' +
          '   <tr> ' +
          '     <td><ng-transclude></ng-transclude></td> ' +
          '     <td><timepicker-wrap ng-model=\"startTime\"></timepicker></td> ' +
          '     <td> <i class=\"mdi mdi-minus\"> </i> </td> ' +
          '     <td><timepicker-wrap ng-model=\"endTime\"></timepicker></td> ' +
          '     <td> ' +
          '       <div class=\"next-day-toggle\"  ng-show=\"!disableNextDay || nextDay\" >' +
          '         <button class=\"wfm-btn wfm-btn-invis-default\" ng-class=\"{\'wfm-btn-invis-disabled\': disableNextDay }\" ng-click=\"toggleNextDay()\">{{ nextDay ? "+ 1" : "+ 0"}}</button> ' +
          '       </div>       ' +
          '     </td> ' +
          '   </tr> ' +
          ' </table> ' +
          '</div>';
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

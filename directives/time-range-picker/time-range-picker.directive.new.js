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
            $scope.startTime = moment();
            $scope.endTime = moment();
            vm.mutateDate = mutateDate;
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

            function mutateDate(date, mDate) {
                date.setTime(mDate.toDate().getTime());
            }

            function sameDate(date1, date2) {
                return true;
//                return date1.toLocaleDateString() === date2.toLocaleDateString();
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

            function formatModel(modelValue) {
                if (!modelValue) {
                    return undefined;
                }

                var mStartTime = angular.isDefined(ngModel.$viewValue.startTime) ?
                  ngModel.$viewValue.startTime : moment();

                var mEndTime = angular.isDefined(ngModel.$viewValue.endTime) ?
                  ngModel.$viewValue.endTime : moment();

                timeRangeCtrl.mutateMoment(mStartTime, modelValue.startTime);
                timeRangeCtrl.mutateMoment(mEndTime, modelValue.endTime);

                var sameDay = timeRangeCtrl.sameDate(modelValue.startTime, modelValue.endTime);

                if (sameDay && !mStartTime.isSame(mEndTime, 'day')) {
                    mEndTime.add('day', -1);
                }

                if (!sameDay && mStartTime.isSame(mEndTime, 'day')) {
                    mEndTime.add('day', 1);
                }

                return ngModel.$viewValue;
            }

            function parseView(viewValue) {
                if (!viewValue) {
                    return undefined;
                }

                var startTime = angular.isDefined(ngModel.$modelValue.startTime) ?
                  ngModel.$modelValue.startTime : new Date();
                var endTime = angular.isDefined(ngModel.$modelValue.endTime) ?
                  ngModel.$modelValue.endTime : new Date();

                timeRangeCtrl.mutateDate(startTime, viewValue.startTime);
                timeRangeCtrl.mutateDate(endTime, viewValue.endTime);

                return ngModel.$modelValue;
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

            function respondToUIChange(change) {
                if (!scope.startTime || !scope.endTime) {
                    ngModel.$setViewValue(null);
                }

                if (scope.disableNextDay) {
                    scope.nextDay = change.strEndTime === '00:00';
                }

                ngModel.$setViewValue({
                    startTime: moment(scope.startTime),
                    endTime: moment(scope.endTime)
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

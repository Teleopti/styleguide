(function() {

    'use strict';

    var wfmTimeRangePickerConfig = {
        showMeridian: true,
        templateUrl: 'directives/time-range-picker/time-range-picker.tpl.html',
    };

    angular.module('wfm.timerangepicker', [])
           .constant('wfmTimeRangePickerConfig', wfmTimeRangePickerConfig)
           .directive('timepickerWrap', [timepickerWrap])
           .directive('timeRangePicker', ['$filter', 'wfmTimeRangePickerConfig', timeRangePicker]);

    function timeRangePicker($filter, wfmTimeRangePickerConfig) {
        return {
            templateUrl: function(element, attrs) {
                return attrs.templateUrl || wfmTimeRangePickerConfig.templateUrl;
            },
            scope: {
                startTime: '=',
                endTime: '=',
                disableNextDay: '=?',
                errors: '=?',
                hideMessage: '=?',
            },
            controller: ['$scope', '$element', timeRangePickerCtrl],
            require: ['timeRangePicker'],
            transclude: true,
            link: postlink,
        };

        function timeRangePickerCtrl($scope, $element) {
            /* jshint validthis: true */
            var vm = this;
            $element.addClass('wfm-time-range-picker-wrap');

            var errors = [];

            if (angular.isDefined($scope.errors)) {$scope.errors = errors;}

            if (!$scope.startTime) {$scope.startTime = moment({hour: 8}).toDate();}

            if (!$scope.endTime) {$scope.endTime = moment({hour: 17}).toDate();}

            $scope.nextDay = isOnDifferentDays();
            $scope.isInvalid = isInvalid;
            $scope.toggleNextDay = toggleNextDay;
            $scope.nextDayToggleText = '+ 0';

            vm.setDateValue = setDateValue;
            vm.checkValidity = checkValidity;
            vm.setNextDayToggleText = setNextDayToggleText;

            function toggleNextDay() {
                if (!$scope.disableNextDay) {
                    $scope.nextDay = !$scope.nextDay;
                }
            }

            function setNextDayToggleText(nextDay) {
                if (nextDay) {
                    $scope.nextDayToggleText = '+ 1';
                } else {
                    $scope.nextDayToggleText = '+ 0';
                }
            }

            function setDateValue(nextDay) {
                var endTimeMoment;
                if (!nextDay) {
                    var thisMomentDate = moment($scope.startTime);
                    endTimeMoment = moment($scope.endTime);
                    thisMomentDate.set('hour', endTimeMoment.get('hour'))
                    .set('minute', endTimeMoment.get('minute'));
                    $scope.endTime = thisMomentDate.toDate();
                } else {
                    var nextMomentDate = moment($scope.startTime).add(1, 'day');
                    endTimeMoment = moment($scope.endTime);
                    nextMomentDate.set('hour', endTimeMoment.get('hour'))
                    .set('minute', endTimeMoment.get('minute'));
                    $scope.endTime = nextMomentDate.toDate();
                }
            }

            function isOnDifferentDays() {
                var startTimeMoment = moment($scope.startTime),
                    endTimeMoment = moment($scope.endTime);

                return !startTimeMoment.isSame(endTimeMoment, 'day') && startTimeMoment.isBefore(endTimeMoment);

            }

            function isInvalid(symbol) {
                if (symbol) {
                    return errors.indexOf(symbol) >= 0;
                } else {
                    return errors.length > 0;
                }
            }

            function checkValidity() {
                errors.splice(0, errors.length);

                if (!$scope.startTime || !$scope.endTime) {
                    errors.push('empty');
                } else if ($scope.startTime >= $scope.endTime) {
                    errors.push('order');
                }

                if (angular.isDefined($scope.errors)) { $scope.errors = errors;}
            }

        }

        function postlink(scope, elem, attrs, ctrls) {
            var ctrl = ctrls[0];

            scope.$watch('nextDay', function(newValue) {
                ctrl.setDateValue(newValue);
                ctrl.setNextDayToggleText(newValue);
            });

            scope.$watch(function() {
                return {
                    n: scope.nextDay,
                    s: scope.startTime ? $filter('date')(scope.startTime, 'HH:mm') : '',
                    e: scope.endTime ? $filter('date')(scope.endTime, 'HH:mm') : '',
                };
            }, function(newValue) {

                if (scope.disableNextDay) {
                    if (newValue.e === '00:00') {
                        scope.$evalAsync(function() { scope.nextDay = true; });

                    } else if (scope.nextDay) {
                        scope.nextDay = false;
                    }
                }

                ctrl.checkValidity();
            }, true);

            scope.showMessage = !angular.isDefined(attrs.hideMessage);
        }
    }

    function timepickerWrap() {

        var meridianInfo = getMeridiemInfoFromMoment();

        return {
            template: '<timepicker></timepicker>',
            controller: ['$scope', timepickerWrapCtrl],
            compile: compileFn,
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
        return '<div ng-class=\"{\'ng-valid\': !isInvalid(), \'ng-invalid\': isInvalid(), \'ng-invalid-order\': isInvalid(\'order\'), \'ng-invalid-empty\': isInvalid(\'empty\')}\">' +
          ' <table> ' +
          '   <tr> ' +
          '     <td><ng-transclude></ng-transclude></td> ' +
          '     <td><timepicker-wrap ng-model=\"startTime\"></timepicker></td> ' +
          '     <td> <i class=\"mdi mdi-minus\"> </i> </td> ' +
          '     <td><timepicker-wrap ng-model=\"endTime\"></timepicker></td> ' +
          '     <td> ' +
          '       <div class=\"next-day-toggle\"  ng-show=\"!disableNextDay || nextDay\" >' +
          '         <button class=\"wfm-btn wfm-btn-invis-default\" ng-class=\"{\'wfm-btn-invis-disabled\': disableNextDay }\" ng-click=\"toggleNextDay()\">{{nextDayToggleText}}</button> ' +
          '       </div>       ' +
          '     </td> ' +
          '   </tr> ' +
          ' </table> ' +
          '</div>' +
          '<div class=\"error-msg-container ng-invalid-order alert-error notice-spacer\" ng-if=\"showMessage\"><i class=\'mdi mdi-alert-octagon\'></i> <span translate>EndTimeMustBeGreaterOrEqualToStartTime</span></div> ' +
    '<div class=\"error-msg-container ng-invalid-empty alert-error notice-spacer\" ng-if=\"showMessage\"><i class=\'mdi mdi-alert-octagon\'></i> <span translate>StartTimeAndEndTimeMustBeSet</span></div>';

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

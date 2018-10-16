(function() {
    'use strict';
    angular.module('wfm.workHourPicker').service('workHourService', [
        '$locale',
        function() {
            this.createEmptyWorkPeriod = function(startTime, endTime) {
                var weekdaySelections = [];
                var startDow = moment.localeData()._week ? moment.localeData()._week.dow : 0;
                // ToDo: Verify the first day of week from $locale.
                for (var i = 0; i < 7; i++) {
                    var curDow = (startDow + i) % 7;
                    weekdaySelections.push({
                        WeekDay: curDow,
                        Checked: false
                    });
                }
                return {
                    StartTime: startTime,
                    EndTime: endTime,
                    WeekDaySelections: weekdaySelections
                };
            };
        }
    ]);

    angular.module('wfm.workHourPicker').directive('workHourPicker', [
        '$q',
        '$translate',
        '$filter',
        '$locale',
        'workHourService',
        'ui.bootstrap',
        function($q, $translate, $filter, $locale, workHourPickerService) {
            return {
                restrict: 'E',
                scope: {
                    workHour: '=',
                    disableNextDay: '=?',
                    maxHoursRange: '=?'
                },
                templateUrl: 'directives/workhourpicker/work-hour-picker.tpl.html',
                link: postLink
            };

            function postLink(scope) {
                scope.enforceRadioBehavior = enforceRadioBehavior;
                scope.addEmptyWorkPeriod = addEmptyWorkPeriod;
                scope.removeWorkPeriod = removeWorkPeriod;
                scope.getTimerangeDisplay = getTimerangeDisplay;
                scope.toggleAllChecks = toggleAllChecks;
                scope.newWorkPeriod = {
                    startTime: new Date(2016, 0, 1, 8),
                    endTime: new Date(2016, 0, 1, 17)
                };

                var weekDays = workHourPickerService.createEmptyWorkPeriod().WeekDaySelections;
                var translations = [];
                var i;
                for (i = 0; i < weekDays.length; i++) {
                    translations.push($translate($filter('showWeekdays')(weekDays[i])));
                }

                $q.all(translations).then(function(ts) {
                    for (i = 0; i < weekDays.length; i++) {
                        weekDays[i].Text = ts[i];
                    }
                    scope.weekDays = weekDays;
                });

                function toggleAllChecks(index) {
                    var isToggleOff = scope.workHour[index].WeekDaySelections.every(function(x) {
                        return x.Checked;
                    });

                    if (isToggleOff) {
                        angular.forEach(scope.workHour[index].WeekDaySelections, function(d) {
                            d.Checked = false;
                        });
                    } else {
                        angular.forEach(scope.workHour[index].WeekDaySelections, function(d) {
                            d.Checked = true;
                            enforceRadioBehavior(index, d.WeekDay);
                        });
                    }
                }

                function enforceRadioBehavior(refIndex, weekDay) {
                    clearConflictWorkHourSelection(scope.workHour, refIndex, weekDay);
                }

                function addEmptyWorkPeriod() {
                    var startTime = scope.newWorkPeriod.startTime,
                        endTime = scope.newWorkPeriod.endTime;
                    scope.workHour.push(
                        workHourPickerService.createEmptyWorkPeriod(angular.copy(startTime), angular.copy(endTime))
                    );
                }

                function removeWorkPeriod(index) {
                    scope.workHour.splice(index, 1);
                }

                function clearConflictWorkHourSelection(workHour, refIndex, weekDay) {
                    angular.forEach(workHour, function(workHour, i) {
                        if (i === refIndex) {
                            return;
                        }
                        angular.forEach(workHour.WeekDaySelections, function(d) {
                            if (weekDay === d.WeekDay) {
                                d.Checked = false;
                            }
                        });
                    });
                }

                function getTimerangeDisplay(startTime, endTime) {
                    var startTimeMoment = moment(startTime),
                        endTimeMoment = moment(endTime);
                    if (startTimeMoment.isSame(endTimeMoment, 'day')) {
                        return (
                            $filter('date')(startTime, $locale.DATETIME_FORMATS.shortTime) +
                            ' - ' +
                            $filter('date')(endTime, $locale.DATETIME_FORMATS.shortTime)
                        );
                    } else {
                        return (
                            $filter('date')(startTime, $locale.DATETIME_FORMATS.shortTime) +
                            ' - ' +
                            $filter('date')(endTime, $locale.DATETIME_FORMATS.shortTime) +
                            ' +1'
                        );
                    }
                }
            }
        }
    ]);
})();

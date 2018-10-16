(function() {
	'use strict';

	angular.module('wfm.workingHoursPicker').service('workingHoursService', [
		'$locale',
		function($locale) {
			this.createEmptyWorkingPeriod = function(startTime, endTime) {
				var weekdaySelections = [];
				var startDow = moment.localeData()._week ? moment.localeData()._week.dow : 0;
				// ToDo: Verify the first day of week from $locale.
				//	$locale.DATETIME_FORMATS.FIRSTDAYOFWEEK;

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

	angular.module('wfm.workingHoursPicker').directive('workingHoursPicker', [
		'$q',
		'$translate',
		'$filter',
		'$locale',
		'workingHoursService',
		function($q, $translate, $filter, $locale, workingHoursPickerService) {
			return {
				restrict: 'E',
				scope: {
					workingHours: '=',
					disableNextDay: '=?',
					maxHoursRange: '=?'
				},
				templateUrl: 'directives/workinghourspicker/working-hours-picker.tpl.html',
				link: postLink
			};

			function postLink(scope, elem, attrs) {
				scope.enforceRadioBehavior = enforceRadioBehavior;
				scope.addEmptyWorkingPeriod = addEmptyWorkingPeriod;
				scope.removeWorkingPeriod = removeWorkingPeriod;
				scope.getTimerangeDisplay = getTimerangeDisplay;
				scope.toggleAllChecks = toggleAllChecks;
				scope.newWorkingPeriod = {
					startTime: new Date(2016, 0, 1, 8),
					endTime: new Date(2016, 0, 1, 17)
				};

				var weekDays = workingHoursPickerService.createEmptyWorkingPeriod().WeekDaySelections;
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
					var isToggleOff = scope.workingHours[index].WeekDaySelections.every(function(x) {
						return x.Checked;
					});

					if (isToggleOff) {
						angular.forEach(scope.workingHours[index].WeekDaySelections, function(d) {
							d.Checked = false;
						});
					} else {
						angular.forEach(scope.workingHours[index].WeekDaySelections, function(d) {
							d.Checked = true;
							enforceRadioBehavior(index, d.WeekDay);
						});
					}
				}

				function enforceRadioBehavior(refIndex, weekDay) {
					clearConflictWorkingHourSelection(scope.workingHours, refIndex, weekDay);
				}

				function addEmptyWorkingPeriod() {
					var startTime = scope.newWorkingPeriod.startTime,
						endTime = scope.newWorkingPeriod.endTime;
					scope.workingHours.push(
						workingHoursPickerService.createEmptyWorkingPeriod(
							angular.copy(startTime),
							angular.copy(endTime)
						)
					);
				}

				function removeWorkingPeriod(index) {
					scope.workingHours.splice(index, 1);
				}

				function clearConflictWorkingHourSelection(workingHours, refIndex, weekDay) {
					angular.forEach(workingHours, function(workingHour, i) {
						if (i === refIndex) {
							return;
						}
						angular.forEach(workingHour.WeekDaySelections, function(d) {
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

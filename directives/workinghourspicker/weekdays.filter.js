(function() {
	'use strict';

	angular.module('wfm.workingHoursPicker').filter('showWeekdays', ['$translate', showWeekdays]);

	function showWeekdays($translate) {
		return function(input) {
			var localeData = moment.localeData($translate.use());
			var weekdays = localeData._weekdaysShort;

			if (input.WeekDay >= weekdays.length) {
				return '';
			}
			return weekdays[input.WeekDay];
		};
	}
})();

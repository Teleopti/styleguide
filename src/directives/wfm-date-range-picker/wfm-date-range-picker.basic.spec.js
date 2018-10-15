describe('Wfm date range picker basics', function() {
	var vm,
		$controller,
		$compile,
		$rootScope,
		currentUserInfo = new FakeCurrentUserInfo(),
		attachedElements = [],
		monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		],
		preSetLength = 14,
		calendarViewElement,
		selectedDateRangeElement,
		fakeToday = new Date(2018, 0, 1),
		dateRange;

	beforeEach(function() {
		module(
			'styleguide.templates',
			'wfm.dateRangePicker',
			'angularMoment',
			'ui.bootstrap',
			'ui.bootstrap.persian.datepicker'
		);
		module(function($provide) {
			$provide.service('CurrentUserInfo', function() {
				return currentUserInfo;
			});
		});

		inject(function(_$controller_, _$compile_, _$rootScope_) {
			$controller = _$controller_;
			$compile = _$compile_;
			$rootScope = _$rootScope_;
		});
	});

	afterEach(function() {
		attachedElements.forEach(function(element) {
			var scope = element.scope();
			scope && scope.$destroy();
			element.remove();
		});
		attachedElements = [];
	});

	function setupPicker(template) {
		dateRange = {
			startDate: moment(fakeToday).toDate(),
			endDate: moment(fakeToday)
				.add(preSetLength - 1, 'day')
				.toDate()
		};

		$rootScope.dateRange = dateRange;
		$rootScope.customValidateForDateRangePicker = function(dateRange) {
			if (moment(dateRange.endDate).diff(moment(dateRange.startDate), 'days') > 7) {
				return '[custom validation]: your end date is 7 days later than your start date';
			}
		};

		var element = $compile(template)($rootScope);
		$rootScope.$digest();
		attachedElements.push(element);

		vm = element.find('wfm-date-range-picker-header').scope().vm;
		selectedDateRangeElement = element[0].getElementsByClassName('wfm-datepicker-text')[0];
		calendarViewElement = element.find('table')[0];
	}

	function FakeCurrentUserInfo() {
		this.CurrentUserInfo = function() {
			return {
				DateFormatLocale: 'en-US'
			};
		};
	}

	it('should be able to prepare data form other controller to component while picker was init', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		expect(vm.pickStartDate).toEqual(dateRange.startDate);
		expect(vm.pickEndDate).toEqual(dateRange.endDate);
	});

	it('should reset hours, minutes and seconds to 0 for selected date', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		expect(vm.pickStartDate.getHours()).toEqual(0);
		expect(vm.pickStartDate.getMinutes()).toEqual(0);
		expect(vm.pickStartDate.getSeconds()).toEqual(0);
		expect(vm.pickEndDate.getHours()).toEqual(0);
		expect(vm.pickEndDate.getMinutes()).toEqual(0);
		expect(vm.pickEndDate.getSeconds()).toEqual(0);
	});

	it('should be able to reset startDate from component', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.resetStartDate();

		expect(vm.pickStartDate).toEqual(null);
		expect(vm.pickEndDate).toEqual(dateRange.endDate);
	});

	it('should be able to reset endDate from component', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.resetEndDate();

		expect(vm.pickStartDate).toEqual(dateRange.startDate);
		expect(vm.pickEndDate).toEqual(null);
	});

	it('should keep end date when picked start date is earlier than previous start date', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.resetStartAndEndDate();

		vm.startToSelectStartDate();
		vm.pickDate = moment([2020, 1, 2]);
		vm.switchDate();

		vm.startToSelectEndDate();
		vm.pickDate = moment([2020, 1, 3]);
		vm.switchDate();

		vm.startToSelectStartDate();
		vm.pickDate = moment([2020, 1, 1]);
		vm.switchDate();

		expect(moment(vm.pickStartDate).isSame(moment([2020, 1, 1]))).toBeTruthy();
		expect(moment(vm.pickEndDate).isSame(moment([2020, 1, 3]))).toBeTruthy();
	});

	it('should keep start date when picked end date is later than previous end date', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.resetStartAndEndDate();

		vm.startToSelectStartDate();
		vm.pickDate = moment([2020, 1, 1]);
		vm.switchDate();

		vm.startToSelectEndDate();
		vm.pickDate = moment([2020, 1, 2]);
		vm.switchDate();

		vm.startToSelectEndDate();
		vm.pickDate = moment([2020, 1, 3]);
		vm.switchDate();

		expect(moment(vm.pickStartDate).isSame(moment([2020, 1, 1]))).toBeTruthy();
		expect(moment(vm.pickEndDate).isSame(moment([2020, 1, 3]))).toBeTruthy();
	});

	it('should reset start date when picked end date is earlier than start date', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.resetStartAndEndDate();

		vm.startToSelectStartDate();
		vm.pickDate = moment([2020, 1, 2]);
		vm.switchDate();

		vm.startToSelectEndDate();
		vm.pickDate = moment([2020, 1, 1]);
		vm.switchDate();

		expect(vm.pickStartDate).toBeFalsy();
		expect(moment(vm.pickEndDate).isSame(moment([2020, 1, 1]))).toBeTruthy();
	});

	it('should reset end date when picked start date is later than end date', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.resetStartAndEndDate();

		vm.startToSelectStartDate();
		vm.pickDate = moment([2020, 1, 2]);
		vm.switchDate();

		vm.startToSelectEndDate();
		vm.pickDate = moment([2020, 1, 1]);
		vm.switchDate();

		vm.startToSelectStartDate();
		vm.pickDate = moment([2020, 1, 3]);
		vm.switchDate();

		expect(moment(vm.pickStartDate).isSame(moment([2020, 1, 3]))).toBeTruthy();
		expect(vm.pickEndDate).toBeFalsy();
	});

	it('should be able to show selected end date on calendar view while start date is set to null', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.resetStartDate();
		var range = calendarViewElement.getElementsByClassName('in-date-range');

		expect(vm.pickStartDate).toEqual(null);
		expect(vm.pickEndDate).not.toEqual(null);
		expect(range.length).not.toEqual(preSetLength);
		expect(range.length).toEqual(1);
	});

	it('should be able to show selected start date on calendar view while end date is set to null', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.resetEndDate();
		var range = calendarViewElement.getElementsByClassName('in-date-range');

		expect(vm.pickEndDate).toEqual(null);
		expect(vm.pickStartDate).not.toEqual(null);
		expect(range.length).not.toEqual(preSetLength);
		expect(range.length).toEqual(1);
	});

	it('should be able to reset to default day of date range on calendar view while start date and end date are both set to null', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.resetStartDate();
		vm.resetEndDate();

		expect(vm.pickEndDate).toEqual(null);
		expect(vm.pickStartDate).toEqual(null);
		expect(moment(vm.pickDate).isSame(new Date(), 'day')).toEqual(true);
	});

	it('should be able to display date range on calendar view while start date and end date are not null', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		var month = monthNames[vm.pickStartDate.getMonth()];
		var year = vm.pickStartDate.getFullYear();
		var startDay = vm.pickStartDate.getDate();
		var endDay = vm.pickEndDate.getDate();
		var monthOnCalendar = calendarViewElement.getElementsByTagName('strong')[0].innerHTML;
		var range = calendarViewElement.getElementsByClassName('in-date-range');
		var rangeStartDate = Math.floor(range[0].getElementsByTagName('span')[0].innerHTML);
		var rangeEndDate = Math.floor(range[range.length - 1].getElementsByTagName('span')[0].innerHTML);

		expect(vm.pickStartDate).not.toEqual(null);
		expect(vm.pickEndDate).not.toEqual(null);
		expect(monthOnCalendar).toEqual(month + ' ' + year);
		expect(range.length).toEqual(preSetLength);
		expect(rangeStartDate).toEqual(startDay);
		expect(rangeEndDate).toEqual(endDay);
	});

	it('should be able to update the display of date range on calendar view while start date is reset and update', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		var moveDays = 3;
		vm.resetStartDate();
		vm.pickDate = moment(fakeToday).add(moveDays, 'day');
		vm.switchDate();

		var month = monthNames[vm.pickStartDate.getMonth()];
		var year = vm.pickStartDate.getFullYear();
		var startDay = vm.pickStartDate.getDate();
		var endDay = vm.pickEndDate.getDate();
		var monthOnCalendar = calendarViewElement.getElementsByTagName('strong')[0].innerHTML;
		var range = calendarViewElement.getElementsByClassName('in-date-range');
		var rangeStartDate = Math.floor(range[0].getElementsByTagName('span')[0].innerHTML);
		var rangeEndDate = Math.floor(range[range.length - 1].getElementsByTagName('span')[0].innerHTML);

		expect(vm.pickStartDate).not.toEqual(null);
		expect(vm.pickStartDate).not.toEqual(dateRange.startDate);
		expect(vm.pickEndDate).not.toEqual(null);
		expect(vm.pickEndDate).toEqual(dateRange.endDate);
		expect(monthOnCalendar).toEqual(month + ' ' + year);
		expect(range.length).toEqual(preSetLength - moveDays);
		expect(rangeStartDate).toEqual(startDay);
		expect(rangeEndDate).toEqual(endDay);
	});

	it('should be able to update the display of date range on calendar view while end date is reset and update', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		var moveDays = 3;
		vm.resetEndDate();
		vm.startToSelectEndDate();
		vm.pickDate = moment(fakeToday).add(preSetLength + moveDays - 1, 'day');
		vm.switchDate();

		var month = monthNames[vm.pickStartDate.getMonth()];
		var year = vm.pickStartDate.getFullYear();
		var startDay = vm.pickStartDate.getDate();
		var endDay = vm.pickEndDate.getDate();
		var monthOnCalendar = calendarViewElement.getElementsByTagName('strong')[0].innerHTML;
		var range = calendarViewElement.getElementsByClassName('in-date-range');
		var rangeStartDate = Math.floor(range[0].getElementsByTagName('span')[0].innerHTML);
		var rangeEndDate = Math.floor(range[range.length - 1].getElementsByTagName('span')[0].innerHTML);

		expect(vm.pickStartDate).not.toEqual(null);
		expect(vm.pickStartDate).toEqual(dateRange.startDate);
		expect(vm.pickEndDate).not.toEqual(null);
		expect(vm.pickEndDate).not.toEqual(dateRange.endDate);
		expect(monthOnCalendar).toEqual(month + ' ' + year);
		expect(range.length).toEqual(preSetLength + moveDays);
		expect(rangeStartDate).toEqual(startDay);
		expect(rangeEndDate).toEqual(endDay);
	});

	it('should be able to auto update new start date after both start date and end date are set to none', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.resetStartAndEndDate();

		vm.startToSelectStartDate();
		var length = preSetLength / 2 - 2;
		vm.pickDate = moment(fakeToday)
			.add(length, 'day')
			.toDate();
		vm.switchDate();

		expect(vm.pickEndDate).toEqual(null);
		expect(vm.pickStartDate).not.toEqual(null);
		expect(moment(vm.pickStartDate).isSame(moment(fakeToday).add(length, 'day'), 'day')).toBeTruthy();
		expect(vm.pickDate).toBeFalsy();
	});

	it('should be able to auto update new start date while new pick date is equal to end date', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.startToSelectStartDate();
		vm.pickDate = moment(fakeToday)
			.add(preSetLength - 1, 'day')
			.toDate();
		vm.switchDate();
		var range = calendarViewElement.getElementsByClassName('in-date-range');

		expect(vm.pickStartDate).toEqual(vm.pickEndDate);
		expect(range.length).toEqual(1);
		expect(vm.dateRangeText.replace(/\s/g, '')).toEqual('1Days');
	});

	it('should be able to auto update new end date while new pick date is equal to start date', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.startToSelectEndDate();
		vm.pickDate = moment(fakeToday);
		vm.switchDate();
		var range = calendarViewElement.getElementsByClassName('in-date-range');

		expect(vm.pickStartDate).toEqual(vm.pickEndDate);
		expect(range.length).toEqual(1);
		expect(vm.dateRangeText.replace(/\s/g, '')).toEqual('1Days');
	});

	it('should automatically set new start date to null after picked start date is later than end date in disabling end date selection mode', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.resetStartAndEndDate();

		vm.pickEndDate = dateRange.endDate;
		vm.disable = 'end-date';

		vm.startToSelectStartDate();
		vm.pickDate = moment(dateRange.endDate)
			.add(1, 'day')
			.toDate();
		vm.switchDate();

		expect(vm.pickEndDate).toEqual(dateRange.endDate);
		expect(vm.pickStartDate).toEqual(null);
	});

	it('should automatically set new end date to null after picked end date is earlier than start date in disabling start date selection mode', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.resetStartAndEndDate();

		vm.pickStartDate = dateRange.startDate;
		vm.disable = 'start-date';

		vm.startToSelectEndDate();
		vm.pickDate = moment(dateRange.startDate)
			.add(-1, 'day')
			.toDate();
		vm.switchDate();

		expect(vm.pickStartDate).toEqual(dateRange.startDate);
		expect(vm.pickEndDate).toEqual(null);
	});

	it('should be able to [handle February as special case] and understand the interval length between 2018-01-31 to 2018-02-27 is one month', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.resetStartAndEndDate();

		vm.startToSelectStartDate();
		vm.pickDate = moment([2018, 0, 31]);
		vm.switchDate();

		vm.startToSelectEndDate();
		vm.pickDate = moment([2018, 1, 27]);
		vm.switchDate();

		expect(vm.dateRangeText.replace(/\s/g, '')).toEqual('1Months');
	});

	it('should be able to [handle February as special case] and understand the interval length between 2018-01-28 to 2018-02-27 is one month', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		/*we dont care the case while the date is end of February since it was very rare and difficult to handle ex: 2018-01-29 to 2018-02-28 is not one month*/
		vm.resetStartAndEndDate();
		vm.startToSelectStartDate();
		vm.pickDate = moment([2018, 0, 28]);
		vm.switchDate();

		vm.startToSelectEndDate();
		vm.pickDate = moment([2018, 1, 27]);
		vm.switchDate();

		expect(vm.dateRangeText.replace(/\s/g, '')).toEqual('1Months');
	});

	it('should be able to [handle February as special case] and understand the interval length between 2018-02-01 to 2018-02-28 is one month', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.resetStartAndEndDate();
		vm.startToSelectStartDate();
		vm.pickDate = moment([2018, 1, 1]);
		vm.switchDate();

		vm.startToSelectEndDate();
		vm.pickDate = moment([2018, 1, 28]);
		vm.switchDate();

		expect(vm.dateRangeText.replace(/\s/g, '')).toEqual('1Months');
	});

	it('should be able to [handle February as special case] and understand the interval length between 2018-01-16 to 2018-02-15 is one month', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.resetStartAndEndDate();
		vm.startToSelectStartDate();
		vm.pickDate = moment([2018, 0, 16]);
		vm.switchDate();

		vm.startToSelectEndDate();
		vm.pickDate = moment([2018, 1, 15]);
		vm.switchDate();

		expect(vm.dateRangeText.replace(/\s/g, '')).toEqual('1Months');
	});

	it('should be able to [handle February as special case] and understand the interval length between 2018-01-16 to 2018-04-15 is three month', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.resetStartAndEndDate();

		vm.startToSelectStartDate();
		vm.pickDate = moment([2018, 0, 16]);
		vm.switchDate();

		vm.startToSelectEndDate();
		vm.pickDate = moment([2018, 3, 15]);
		vm.switchDate();

		expect(vm.dateRangeText.replace(/\s/g, '')).toEqual('3Months');
	});

	it('should be able to [handle February as special case in leap year] and understand the interval length between 2020-01-29 to 2020-02-28 is one month', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		/*we dont care the case while the date is end of February since it was very rare and difficult to handle ex: 2020-01-30 to 2010-02-29 is not one month*/
		vm.resetStartAndEndDate();

		vm.startToSelectStartDate();
		vm.pickDate = moment([2020, 0, 29]);
		vm.switchDate();

		vm.startToSelectEndDate();
		vm.pickDate = moment([2020, 1, 28]);
		vm.switchDate();

		expect(vm.dateRangeText.replace(/\s/g, '')).toEqual('1Months');
	});

	it('should be able to [handle February as special case in leap year] and understand the interval length between 2020-01-31 to 2020-02-28 is one month', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.resetStartAndEndDate();

		vm.startToSelectStartDate();
		vm.pickDate = moment([2020, 0, 31]);
		vm.switchDate();

		vm.startToSelectEndDate();
		vm.pickDate = moment([2020, 1, 28]);
		vm.switchDate();

		expect(vm.dateRangeText.replace(/\s/g, '')).toEqual('1Months');
	});

	it('should be able to [handle February as special case in leap year] and understand the interval length between 2020-02-01 to 2018-02-29 is one month', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange"></wfm-date-range-picker>');

		vm.resetStartAndEndDate();

		vm.startToSelectStartDate();
		vm.pickDate = moment([2020, 1, 1]);
		vm.switchDate();

		vm.startToSelectEndDate();
		vm.pickDate = moment([2020, 1, 29]);
		vm.switchDate();

		expect(vm.dateRangeText.replace(/\s/g, '')).toEqual('1Months');
	});

	it('should be able to validate date range', function() {
		setupPicker(
			'<wfm-date-range-picker ng-model="dateRange" custom-validate="customValidateForDateRangePicker(dateRange)"></wfm-date-range-picker>'
		);

		vm.resetStartAndEndDate();

		vm.startToSelectStartDate();
		vm.pickDate = moment('2018-01-01');
		vm.switchDate();

		vm.startToSelectEndDate();
		vm.pickDate = moment('2018-01-09');
		vm.switchDate();

		expect(vm.dateRangeText).toEqual('[custom validation]: your end date is 7 days later than your start date');
	});

	it('should show select date range for popup date range picker', function() {
		setupPicker('<wfm-date-range-picker ng-model="dateRange" popup-mode="true"></wfm-date-range-picker>');

		vm.resetStartAndEndDate();

		vm.startToSelectStartDate();
		vm.pickDate = moment('2018-01-01');
		vm.switchDate();

		vm.startToSelectEndDate();
		vm.pickDate = moment('2018-01-09');
		vm.switchDate();

		expect(selectedDateRangeElement.innerHTML.indexOf('From: January 1, 2018') > -1).toEqual(true);
		expect(selectedDateRangeElement.innerHTML.indexOf('To: January 9, 2018') > -1).toEqual(true);
	});
});

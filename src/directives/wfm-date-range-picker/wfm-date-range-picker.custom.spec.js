describe('Wfm date range picker custom', function() {
	var vm,
		$controller,
		$compile,
		$rootScope,
		$timeout,
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
		preSetLength = 36,
		pickerWithPresetDateRange,
		calendarView,
		fakeToday = new Date(2018, 0, 1),
		data;

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
		inject(function(_$controller_, _$compile_, _$rootScope_, _$timeout_) {
			$controller = _$controller_;
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$timeout = _$timeout_;
		});

		data = {
			startDate: moment(fakeToday).toDate(),
			endDate: moment(fakeToday)
				.add(preSetLength - 1, 'day')
				.toDate()
		};

		$rootScope.data = data;
		$rootScope.customValid = function(data) {
			return 'you are using custom validation function';
		};
	});

	afterEach(function() {
		attachedElements.forEach(function(element) {
			var scope = element.scope();
			scope && scope.$destroy();
			element.remove();
		});
		attachedElements = [];
	});

	function setupPicker(attrs, scope, optCompileOpts) {
		var el;
		var template = '' + '<wfm-date-range-picker ' + (attrs || '') + '>' + '</wfm-date-range-picker>';

		el = $compile(template)(scope || $rootScope);

		$rootScope.$digest();
		attachedElements.push(el);

		return el;
	}

	function FakeCurrentUserInfo() {
		this.CurrentUserInfo = function() {
			return {
				DateFormatLocale: 'en-US'
			};
		};
	}

	it('should be able to pass custom validate function', function() {
		pickerWithPresetDateRange = setupPicker('ng-model="data" custom-validate="customValid(data)"');
		vm = pickerWithPresetDateRange.find('wfm-date-range-picker-header').scope().vm;

		expect(vm.pickStartDate).toEqual(data.startDate);
		expect(vm.pickEndDate).toEqual(data.endDate);
		expect(vm.dateRangeText).toEqual('you are using custom validation function');
	});

	it('should be able to validate interval by weeks', function() {
		pickerWithPresetDateRange = setupPicker('ng-model="data" interval-rule="week"');
		vm = pickerWithPresetDateRange.find('wfm-date-range-picker-header').scope().vm;

		expect(vm.pickStartDate).toEqual(data.startDate);
		expect(vm.pickEndDate).toEqual(data.endDate);
		expect(vm.dateRangeText.replace(/\s/g, '')).toEqual('5Weeks1Days');
	});

	it('should be able to only allow update end date with a readonly preselected start date', function() {
		pickerWithPresetDateRange = setupPicker('ng-model="data" disable="start-date"');
		vm = pickerWithPresetDateRange.find('wfm-date-range-picker-header').scope().vm;
		vm.pickDate = moment(fakeToday)
			.add(preSetLength / 2 - 10, 'day')
			.toDate();
		vm.switchDate();

		expect(vm.pickStartDate).toEqual(data.startDate);
		expect(vm.pickEndDate).not.toEqual(data.endDate);
		expect(vm.pickEndDate).toEqual(vm.pickDate);
	});

	it('should be able to reset end date with a readonly preselected start date', function() {
		pickerWithPresetDateRange = setupPicker('ng-model="data" disable="start-date"');
		vm = pickerWithPresetDateRange.find('wfm-date-range-picker-header').scope().vm;
		calendarView = pickerWithPresetDateRange.find('table')[0];
		vm.resetEndDate();
		var range = calendarView.getElementsByClassName('in-date-range');

		expect(vm.pickStartDate).toEqual(data.startDate);
		expect(vm.pickEndDate).not.toEqual(data.endDate);
		expect(vm.pickEndDate).toEqual(null);
		expect(range.length).not.toEqual(preSetLength);
		expect(range.length).toEqual(0);
	});

	it('should be able to disable modifying a readonly preselected end date', function() {
		pickerWithPresetDateRange = setupPicker('ng-model="data" disable="end-date"');
		vm = pickerWithPresetDateRange.find('wfm-date-range-picker-header').scope().vm;
		vm.pickDate = moment(fakeToday)
			.add(preSetLength / 2 - 10, 'day')
			.toDate();
		vm.switchDate();

		expect(vm.pickEndDate).toEqual(data.endDate);
		expect(vm.pickStartDate).not.toEqual(data.startDate);
		expect(vm.pickStartDate).toEqual(vm.pickDate);
	});

	it('should be able to modify start date with a readonly preselected end date', function() {
		var fakeData = {
			startDate: moment(fakeToday).toDate(),
			endDate: moment(fakeToday)
				.add(1, 'day')
				.toDate()
		};

		$rootScope.data = fakeData;

		pickerWithPresetDateRange = setupPicker('ng-model="data" disable="end-date"');
		vm = pickerWithPresetDateRange.find('wfm-date-range-picker-header').scope().vm;
		calendarView = pickerWithPresetDateRange.find('table')[0];

		vm.resetStartDate();
		var range = calendarView.getElementsByClassName('in-date-range');

		expect(vm.pickEndDate).toEqual(fakeData.endDate);
		expect(vm.pickStartDate).not.toEqual(fakeData.startDate);
		expect(vm.pickStartDate).toEqual(null);
		expect(range.length).not.toEqual(preSetLength);
		expect(range.length).toEqual(1);
	});

	it('should be able to display weeks number on calendar view', function() {
		pickerWithPresetDateRange = setupPicker('ng-model="data" show-week="true"');
		vm = pickerWithPresetDateRange.find('wfm-date-range-picker-header').scope().vm;
		calendarView = pickerWithPresetDateRange.find('table')[0];
		var weekNumber = calendarView.getElementsByClassName('text-center h6');

		expect(weekNumber.length).toEqual(6);
	});

	it('should be able to disable weeks number on calendar view', function() {
		pickerWithPresetDateRange = setupPicker('ng-model="data" show-week="false"');
		vm = pickerWithPresetDateRange.find('wfm-date-range-picker-header').scope().vm;
		calendarView = pickerWithPresetDateRange.find('table')[0];
		var weekNumber = calendarView.getElementsByClassName('text-center h6');

		expect(weekNumber.length).toEqual(0);
	});

	it('should be able to switch to single day picker mode', function() {
		pickerWithPresetDateRange = setupPicker('ng-model="data2" single-date-picker');
		vm = pickerWithPresetDateRange.find('wfm-date-range-picker-header').scope().vm;
		calendarView = pickerWithPresetDateRange.find('table')[0];

		$timeout(function() {
			var check = moment(vm.pickDate).isSame(moment(fakeToday));

			expect(vm.pickDate).not.toEqual(null);
			expect(check).toEqual(true);
		});
	});

	it('should be able to pick date while is on single day picker mode', function() {
		pickerWithPresetDateRange = setupPicker('ng-model="data2" single-date-picker');
		vm = pickerWithPresetDateRange.find('wfm-date-range-picker-header').scope().vm;
		calendarView = pickerWithPresetDateRange.find('table')[0];
		vm.pickDate = moment(fakeToday)
			.add(5, 'day')
			.toDate();

		$timeout(function() {
			var diffDays = moment(vm.pickDate).diff(vm.pickDate, 'day');

			expect(vm.pickDate).not.toEqual(null);
			expect(diffDays).toEqual(5);
		});
	});
});

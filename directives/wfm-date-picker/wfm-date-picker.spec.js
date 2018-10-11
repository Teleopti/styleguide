describe('Wfm date picker basics', function() {
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
		pickerWithPresetDate,
		calendarView,
		fakeToday = moment('2018-01-01');

	beforeEach(function() {
		module(
			'styleguide.templates',
			'wfm.datePicker',
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

		$rootScope.selectedDate = fakeToday;
		$rootScope.customValidateForDatePicker = function(date) {
			if (moment(date).diff(moment(fakeToday), 'days') < 0) {
				return '[custom validation]: can not select dates before today';
			}
		};

		pickerWithPresetDate = setupPicker(
			'ng-model="selectedDate" custom-validate="customValidateForDatePicker(selectedDate)"'
		);
		vm = pickerWithPresetDate.find('wfm-date-picker-header').scope().vm;
		calendarView = pickerWithPresetDate.find('table')[0];
	});

	afterEach(function() {
		attachedElements.forEach(function(element) {
			var scope = element.scope();
			scope && scope.$destroy();
			element.remove();
		});
		attachedElements = [];
	});

	function setupPicker(attrs, scope) {
		var template = '' + '<wfm-date-picker ' + (attrs || '') + '>' + '</wfm-date-picker>';
		var element = $compile(template)(scope || $rootScope);

		$rootScope.$digest();
		attachedElements.push(element);

		return element;
	}

	function FakeCurrentUserInfo() {
		this.CurrentUserInfo = function() {
			return {
				DateFormatLocale: 'en-US'
			};
		};
	}

	it('should be able to prepare data form other controller to component while picker was init', function() {
		expect(moment(vm.pickDate).format('YYYY-MM-DD')).toEqual(moment(fakeToday).format('YYYY-MM-DD'));
	});

	it('should reset hours, minutes and seconds to 0 for selected date', function() {
		expect(vm.pickDate.getHours()).toEqual(0);
		expect(vm.pickDate.getMinutes()).toEqual(0);
		expect(vm.pickDate.getSeconds()).toEqual(0);
	});

	it('should be able to reset to default day on calendar view while pick date is to null', function() {
		vm.resetDate();

		expect(vm.pickDate).toEqual(null);
	});

	it('should be able to display selected date on calendar view while pick date is not null', function() {
		var month = monthNames[vm.pickDate.getMonth()];
		var year = vm.pickDate.getFullYear();
		var date = vm.pickDate.getDate();
		var monthOnCalendar = calendarView.getElementsByTagName('strong')[0].innerHTML;
		var dateCell = calendarView.getElementsByClassName('selected-date-cell');
		var selectedDate = Math.floor(dateCell[0].getElementsByTagName('span')[0].innerHTML);

		expect(vm.pickDate).not.toEqual(null);
		expect(monthOnCalendar).toEqual(month + ' ' + year);
		expect(dateCell.length).toEqual(1);
		expect(selectedDate).toEqual(date);
	});

	it('should be able to validate selected date', function() {
		vm.resetDate();

		vm.pickDate = moment(fakeToday).add(-1, 'days');
		vm.ngModel.$setViewValue(vm.pickDate);

		expect(vm.dateValiationText).toEqual('[custom validation]: can not select dates before today');
	});
});

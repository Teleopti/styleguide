describe('date-range-picker directive', function() {
	var elementCompile, scope, $rootScope, $compile;

	beforeEach(function() {
		module('wfm.oldDateRangePicker');
	});

	beforeEach(
		module(function($provide) {
			$provide.service('CurrentUserInfo', function() {
				this.CurrentUserInfo = function() {
					return {
						DateFormatLocale: 'en-us'
					};
				};
			});
		})
	);

	beforeEach(
		inject(function(_$compile_, _$rootScope_) {
			$rootScope = _$rootScope_;
			$compile = _$compile_;
			scope = $rootScope.$new();

			scope.dateRange = {
				startDate: new Date('2015-09-01'),
				endDate: new Date('2015-09-05')
			};
			elementCompile = $compile(
				'<date-range-picker ng-model="dateRange" test-stop-ui="true"></date-range-picker>'
			);
		})
	);

	it('Directive compilation should work', function() {
		var element = elementCompile(scope);
		scope.$apply();
		expect(element).toBeDefined();
	});

	it('Should show inline datepickers for start-date and end-date for gregorian dates', function() {
		var element = elementCompile(scope);
		scope.$digest();
		var datepickers = element[0].querySelectorAll('.inline-datepicker[uib-datepicker]');
		expect(datepickers.length).toEqual(2);
	});

	it('Should show inline datepickers for start-date and end-date for persian dates', function() {
		var element = elementCompile(scope);
		scope.$digest();
		var datepickers = element[0].querySelectorAll('persian-datepicker.inline-datepicker');
		expect(datepickers.length).toEqual(2);
	});

	it('Should show popup datepickers for start-date and end-date for gregorian dates', function() {
		var element = elementCompile(scope);
		scope.$digest();
		var datepickers = element[0].querySelectorAll('.popup-datepicker[uib-datepicker]');
		expect(datepickers.length).toEqual(2);
	});

	it('Should show popup datepickers for start-date and end-date for persian dates', function() {
		var element = elementCompile(scope);
		scope.$digest();
		var datepickers = element[0].querySelectorAll('persian-datepicker.popup-datepicker');
		expect(datepickers.length).toEqual(2);
	});

	it('Should show error when start-date is greater than end-date', function() {
		scope.dateRange.startDate = new Date('2015-09-30');
		scope.dateRange.endDate = new Date('2015-09-01');

		var element = elementCompile(scope);
		scope.$apply();

		expect(element.hasClass('ng-invalid-order')).toBeTruthy();
	});

	it('Should show error when start-date or end-date is not set', function() {
		scope.dateRange.startDate = new Date('2015-09-30');
		var element = elementCompile(scope);
		scope.$apply();

		scope.dateRange.startDate = null;
		scope.$apply();

		expect(element.hasClass('ng-invalid')).toBeTruthy();
	});

	it('Should call onPopupClose after close popup datepicker when onPopupClose is not null', function() {
		var isClosed = false;
		var newScope = $rootScope.$new();
		newScope.dateRange = { startDate: new Date('2018-08-01') };
		newScope.onPopUpClose = function() {
			isClosed = true;
		};
		var element = $compile(
			'<date-range-picker ng-model="dateRange" template-type="popup" on-pop-up-close="onPopUpClose()"></date-range-picker>'
		)(newScope);
		newScope.$apply();

		element[0].querySelector('.modalbg').click();
		expect(isClosed).toBeTruthy();
	});
});

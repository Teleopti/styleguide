'use strict';
describe('time-range-picker directive', function() {
	var elementCompileFn, elementCompileWithHoursLimitFn, $templateCache, $compile, $translate, element, scope;

	beforeEach(module('styleguide.templates'));
	beforeEach(module('tmh.dynamicLocale'));
	beforeEach(
		module(function(tmhDynamicLocaleProvider) {
			tmhDynamicLocaleProvider.localeLocationPattern(
				'/base/node_modules/angular-i18n/angular-locale_{{locale}}.js'
			);
		})
	);
	beforeEach(module('wfm.timerangepicker'));

	beforeEach(
		inject(function(_$compile_, _$rootScope_, _$templateCache_, _$translate_) {
			$templateCache = _$templateCache_;
			$compile = _$compile_;
			$translate = _$translate_;
			scope = _$rootScope_.$new();
			var startTime = moment({
				hour: 8,
				minute: 30
			}).toDate();
			var endTime = moment({
				hour: 17,
				minute: 30
			}).toDate();

			scope.timeRange = {
				startTime: startTime,
				endTime: endTime
			};

			elementCompileFn = function() {
				return $compile('<time-range-picker ng-model="timeRange"></time-range-picker>');
			};

			elementCompileWithHoursLimitFn = function() {
				return $compile('<time-range-picker max-hours-range="3" ng-model="timeRange"></time-range-picker>');
			};
		})
	);

	it('Directive compilation should work', function() {
		var element = elementCompileFn()(scope);
		scope.$apply();
		expect(element).toBeDefined();
	});

	describe('custom template', function() {
		it('should allow custom templates', function() {
			$templateCache.put('foo/bar.html', '<div class="custom-template">baz</div>');
			element = $compile(
				'<time-range-picker ng-model="timeRange" template-url="foo/bar.html"></time-range-picker>'
			)(scope);
			scope.$apply();
			expect(element.children().hasClass('custom-template')).toBeTruthy();
			expect(element.children().html()).toBe('baz');
		});
	});

	it('Should show timepickers for start-time and end-time', function() {
		var element = elementCompileFn()(scope);
		scope.$apply();
		var timepickers = element.find('timepicker-wrap');
		expect(timepickers.length).toEqual(2);
	});

	it('Should show error when start-time is greater than end-time', function() {
		scope.timeRange.startTime = moment({
			hour: 10,
			minute: 30
		}).toDate();
		scope.timeRange.endTime = moment({
			hour: 8,
			minute: 30
		}).toDate();

		var element = elementCompileFn()(scope);
		scope.$apply();

		expect(element.hasClass('ng-invalid')).toBeTruthy();
		expect(element.hasClass('ng-invalid-order')).toBeTruthy();
	});

	it('Should show error when time range is larger than max-hours-range', function() {
		scope.timeRange.startTime = moment({
			hour: 2,
			minute: 30
		}).toDate();
		scope.timeRange.endTime = moment({
			hour: 10,
			minute: 30
		}).toDate();

		var element = elementCompileWithHoursLimitFn()(scope);
		scope.$apply();
		expect(element.hasClass('ng-invalid-range')).toBeTruthy();
	});

	it('Should not show error when end-time is on the next day', function() {
		scope.timeRange.startTime = moment({
			hour: 10,
			minute: 30
		}).toDate();
		scope.timeRange.endTime = moment({
			hour: 8,
			minute: 30
		})
			.add(1, 'day')
			.toDate();

		var element = elementCompileFn()(scope);
		scope.$apply();

		expect(element.hasClass('ng-invalid-order')).toBeFalsy();
	});

	it('Should set the next-day to true when start-time and the end-time are on different days', function() {
		scope.timeRange.startTime = moment({
			hour: 10,
			minute: 30
		}).toDate();
		scope.timeRange.endTime = moment({
			hour: 8,
			minute: 30
		})
			.add(1, 'day')
			.toDate();

		var element = elementCompileFn()(scope);
		scope.$apply();

		var divs = element.children();
		var validityDiv = angular.element(divs[0]);

		expect(validityDiv.scope().nextDay).toBeTruthy();
	});

	describe('l10n', function() {
		it('should be able to change locale', function(done) {
			inject([
				'$locale',
				'$timeout',
				'tmhDynamicLocale',
				function($locale, $timeout, tmhDynamicLocale) {
					tmhDynamicLocale.set('sv').then(function(locale) {
						expect($locale.id).toBe('sv');
						expect($locale['DATETIME_FORMATS']['shortTime']).toBe('HH:mm');
						done();
					});
					setTimeout($timeout.flush, 400);
				}
			]);
		});

		it('Should not show meridian in Swedish time-format', function(done) {
			inject(function($timeout, tmhDynamicLocale) {
				tmhDynamicLocale.set('sv').then(function(locale) {
					// use timeout to avoid crashing digest loop
					setTimeout(function() {
						var element = elementCompileFn()(scope);
						scope.$apply();
						var timepicker = angular.element(element.find('timepicker-wrap')[0]);
						expect(timepicker.scope().showMeridian).toBeFalsy();
						done();
					}, 200);
				});
				setTimeout($timeout.flush, 500);
			});
		});

		it('Should show meridian in US time-format', function(done) {
			inject([
				'$locale',
				'$timeout',
				'tmhDynamicLocale',
				function($locale, $timeout, tmhDynamicLocale) {
					tmhDynamicLocale.set('en-us').then(function(locale) {
						setTimeout(function() {
							var element = elementCompileFn()(scope);
							scope.$apply();
							var timepicker = angular.element(element.find('timepicker-wrap')[0]);
							expect(timepicker.scope().showMeridian).toBeTruthy();
							done();
						}, 200);
					});
					setTimeout($timeout.flush, 500);
				}
			]);
		});
	});

	it('Setting next day to true will change the end-time to different date value', function() {
		var element = elementCompileFn()(scope);

		scope.$apply();
		var divs = element.children();
		var validityDiv = angular.element(divs[0]);

		validityDiv.scope().nextDay = true;

		scope.$apply();
		expect(scope.timeRange.startTime.getDate()).not.toEqual(scope.timeRange.endTime.getDate());
	});

	it('Setting next day to false will change the end-time to same date value', function() {
		scope.timeRange.startTime = moment({
			hour: 5,
			minute: 30
		}).toDate();
		scope.timeRange.endTime = moment({
			hour: 8,
			minute: 30
		})
			.add(1, 'day')
			.toDate();

		var element = elementCompileFn()(scope);

		scope.$apply();
		var divs = element.children();
		var validityDiv = angular.element(divs[0]);

		validityDiv.scope().nextDay = false;

		scope.$apply();
		expect(scope.timeRange.startTime.getDate()).toEqual(scope.timeRange.endTime.getDate());
	});
});

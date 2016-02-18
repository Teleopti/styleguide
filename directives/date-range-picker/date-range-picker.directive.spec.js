describe('date-range-picker directive', function() {
    var elementCompile,
        scope;

    beforeEach(module('wfm.daterangepicker'));

    beforeEach(inject(function($compile, $rootScope) {
        scope = $rootScope.$new();
        scope.startDate = new Date('2015-09-01');
        scope.endDate = new Date('2015-09-05');
        elementCompile = $compile('<date-range-picker start-date="startDate" end-date="endDate"></date-range-picker>');
    }));

    it('Directive compilation should work', function() {
        var element = elementCompile(scope);
        scope.$apply();
        expect(element).toBeDefined();
    });

    it('Should show datepickers for start-date and end-date', function() {
        var element = elementCompile(scope);
        var datepickers = element.find('datepicker');
        expect(datepickers.length).toEqual(2);
    });

    it('Should show error when start-date is greater than end-date', function() {
        scope.startDate = new Date('2015-09-30');
        scope.endDate = new Date('2015-09-01');

        var element = elementCompile(scope);
        scope.$apply();

        var divs = element.children(),
            validityDiv = angular.element(divs[0]);

        expect(validityDiv.hasClass('ng-invalid-order')).toBeTruthy();
    });

    it('Should show error when start-date or end-date is not set', function() {
        scope.startDate = null;

        var element = elementCompile(scope);
        scope.$apply();

        var divs = element.children(),
            validityDiv = angular.element(divs[0]);

        expect(validityDiv.hasClass('ng-invalid-empty')).toBeTruthy();

    });

});

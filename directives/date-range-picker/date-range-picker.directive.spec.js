describe('date-range-picker directive', function() {
    var elementCompile,
        scope;

    beforeEach(
      function(){
      module('wfm.directives.templates');
      module('wfm.daterangepicker');
      }
    );

    beforeEach(inject(function($compile, $rootScope) {
        scope = $rootScope.$new();

        scope.dateRange = {
            startDate: new Date('2015-09-01'),
            endDate: new Date('2015-09-05')
        };
        elementCompile = $compile('<date-range-picker ng-model="dateRange" test-stop-ui="true"></date-range-picker>');
    }));

    it('Directive compilation should work', function() {
        var element = elementCompile(scope);
        scope.$apply();
        expect(element).toBeDefined();
    });

    it('Should show datepickers for start-date and end-date', function() {
        var element = elementCompile(scope);
        scope.$digest();
        var datepickers = element.find('uib-datepicker');
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
        scope.dateRange.startDate = null;

        var element = elementCompile(scope);
        scope.$apply();

        expect(element.hasClass('ng-invalid-empty')).toBeTruthy();

    });

});

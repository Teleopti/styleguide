
describe('autofocus', function() {
    var element;
    var rootScope;
    var elementCompile;
    beforeEach(
    function() {
        module('wfm.autofocus');
    }
  );

    beforeEach(inject(function($compile, $rootScope) {
        rootScope = $rootScope.$new();
    }));

    it('should set the focus on input', function () {
        inject(function($compile, $timeout) {
            var element = angular.element('<input type="text" autofocus/>');
            elementCompile = $compile(element)(rootScope);
            rootScope.$digest();

            spyOn(element[0],'focus');
            $timeout.flush();
            expect(element[0].focus).toHaveBeenCalled();
        });
    });
});

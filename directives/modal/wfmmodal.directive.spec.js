(function() {
    'use strict';
    describe('modal-dialog directive', function() {
        var elementCompile,
            scope,
            directiveScope;

        beforeEach(
          function() {
            module('wfm.modal');
        }
        );

        beforeEach(inject(function($compile, $rootScope) {
            scope = $rootScope.$new();
            var element = '<div><modal-dialog show="modalShown" ng-cloak></modal-dialog></div>';
            elementCompile = $compile(element)(scope);
            scope.$digest();
            directiveScope = elementCompile.children().isolateScope();
        }));

        it('is hidden by default', function() {
            expect(elementCompile[0].querySelector('.modal-box.ng-hide')).not.toBe(null);
        });
        it('is displayed when shown is true', function() {
            scope.modalShown = true;
            scope.$digest();

            expect(elementCompile[0].querySelector('.modal-box.ng-hide')).toBe(null);
        });
        it('is hidden when the close button is clicked', function() {
            scope.modalShown = true;
            scope.$digest();
            directiveScope.hideModal();
            scope.$digest();

            expect(elementCompile[0].querySelector('.modal-box.ng-hide')).not.toBe(null);
        });
        it('is hidden when the overlay is clicked', function() {
            scope.modalShown = true;
            scope.$digest();
            var overlay = elementCompile[0].querySelector('.modalbg');
            overlay.click();
            scope.$digest();

            expect(elementCompile[0].querySelector('.modal-box.ng-hide')).not.toBe(null);
        });
    });
})();

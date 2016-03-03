(function() {
    'use strict';
    describe('modal-dialog directive', function() {
      var elementCompile,
          scope;

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
      }));

      it('is hidden by default', function() {
          expect(elementCompile.find('modal-dialog')).toEqual({});
      });
      xit('is displayed when shown is true', function() {
          scope.modalShown = true;
          scope.$digest();
          expect(elementCompile.find('modal-dialog')).not.toEqual({});
      });
      it('is hidden when the close button is clicked', function() {});
      it('is hidden when the overlay is clicked', function() {});
  });
})();

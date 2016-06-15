(function() {
    'use strict';
    describe('pagination directive', function() {
      var elementCompile,
          scope,
          directiveScope;

      beforeEach(
        function() {
            module('wfm.pagination');
        }
      );

      beforeEach(inject(function($compile, $rootScope) {
          scope = $rootScope.$new();
          var element = '<wfm-pagination class="pull-pagination" ' +
                            'pagination-options="paginationOptions" ' +
                            'get-data-for-page-callback="getPageData"></wfm-pagination>';
          elementCompile = $compile(element)(scope);
          scope.$digest();
          directiveScope = elementCompile.children().isolateScope();
      }));

      it('should display five pages number', function() {
          scope.paginationOptions = {totalPages: 6, pageNumber: 1};
          scope.$digest();
          expect(elementCompile[0].querySelectorAll('.pagination .pagination-item').length).toBe(9);
          expect(elementCompile[0].querySelectorAll('.pagination .pagination-item.disabled').length).toBe(2);
      });

  });
})();

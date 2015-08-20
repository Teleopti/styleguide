'use strict';

describe('Selectable data grid directive test', function () {

    var $rootScope, scope, datagrid;
    beforeEach(module('teleopti.wfm'));
    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope;
        scope.recordItems = ['a','b', 'c', 'd'];

        datagrid = $compile('<selectable-data-grid record-items="recordItems" items-per-row="4">')(scope);

        scope.$digest();
    }));

    it('Should create a datagrid with one row and four items per row', function () {
        
        expect(datagrid.find('tr').length).toBe(1);
    });
});
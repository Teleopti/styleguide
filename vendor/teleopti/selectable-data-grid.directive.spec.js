'use strict';

describe('Selectable data grid directive test', function () {

    var $rootScope, scope, datagrid;
    
    beforeEach(module('teleopti.wfm'));

    var TEMPLATE_BASIC = '<selectable-data-grid record-items="recordItems" items-per-row="{{itemsPerRow}}">';
    var TEMPLATE_BASIC_OFFSET = '<selectable-data-grid record-items="recordItems" items-per-row="{{itemsPerRow}}" starting-offset={{startingOffset}}>';
    var TEMPLATE_BASIC_HEADERS = '<selectable-data-grid record-items="recordItems" items-per-row="{{itemsPerRow}}" grid-headers="gridHeaders">';
        
            
    describe('Test basic directive attributes', function() {
              
        it('Should create a datagrid with a single row', function () {
            
            datagrid = setupDatagrid(TEMPLATE_BASIC, {
                recordItems: ['a', 'b', 'c', 'd'],
                itemsPerRow: 4
            });            
            
            expect(datagrid.find('tr').length).toBe(1);
            expect(datagrid.find('td').length).toBe(4);
        });

        it('Should create a datagrid with multiple rows', function() {
            
            datagrid = setupDatagrid(TEMPLATE_BASIC, {
                recordItems: ['a', 'b', 'c', 'd', 'e', 'f'],
                itemsPerRow: 4
            });            
            
            var rows = datagrid.find('tr');
            expect(rows.length).toBe(2);
            expect(angular.element(rows[0]).find('td').length).toBe(4);
            expect(angular.element(rows[1]).find('td').length).toBe(4);           
        });

        it('Should create a datagrid with multiple rows caused by offset', function() {

            datagrid = setupDatagrid(TEMPLATE_BASIC_OFFSET, {
                recordItems: ['a', 'b', 'c', 'd'],
                itemsPerRow: 4,
                startingOffset: 2
            });            
            
            expect(datagrid.find('tr').length).toBe(2);                        
        });

        it('Should create a datagrid with headers', function() {

            datagrid = setupDatagrid(TEMPLATE_BASIC_HEADERS, {
                recordItems: ['a', 'b', 'c', 'd'],
                itemsPerRow: 4,
                gridHeaders: ['A', 'B', 'C', 'D']
            });

            var rows = datagrid.find('tr');
            expect(rows.length).toBe(2);
            expect(angular.element(rows[0]).find('th').length).toBe(4);
            expect(angular.element(rows[1]).find('td').length).toBe(4);
        });

    });


    describe('Test transclusion in grid cells', function() {

      

    });
   

    function setupDatagrid(template, scopeVars) {
        var datagrid;
        
        inject(function($rootScope, $compile) {
            var scope = $rootScope.$new();
            angular.extend(scope, scopeVars);
            datagrid = $compile(template)(scope);
            scope.$digest();
        });

        return datagrid;
    }
    
});
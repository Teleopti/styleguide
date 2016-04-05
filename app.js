(function() {
    'use strict';
    angular.module('styleguideApp', [
      'pascalprecht.translate',
      'ngMaterial',
      'ngSanitize',
      'ui.tree',
      'ui.grid',
      'ui.grid.autoResize',
      'ui.grid.exporter',
      'ui.grid.selection',
      'ui.bootstrap',
      'ui.bootstrap.tpls',
      'angularMoment',
      'wfm.cardList',
      'wfm.timerangepicker',
      'wfm.daterangepicker',
      'wfm.workinghourspicker',
      'ngAnimate',
      'wfm.pagination',
      'wfm.modal',
      'wfm.numericValue',
      'wfm.notice'
]).config(['$translateProvider', function($translateProvider) {

    $translateProvider
  .translations('en-us', {
      'Sun': 'Sun',
      'Mon': 'Mon',
      'Tue': 'Tue',
      'Wed': 'Wed',
      'Thu': 'Thu',
      'Fri': 'Fri',
      'Sat': 'Sat'
  });
    $translateProvider.preferredLanguage('en-us');

}])
.controller('mainCtrl', ['$scope', '$translate', 'NoticeService', function($scope, $translate, NoticeService) {
    $translate.use('en-us');
    /* Dummy data*/
    $scope.demos = [{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}];
    $scope.treeDemos =   [
      {categories: [{name: 'item 1'}, {name: 'item 2'}, {name: 'item 3'}, {name: 'item 2'}],
      name: 'First Group',},
      {categories: [{name: 'item 1'}, {name: 'item 3'}], name: 'Second Group'}, {categories: [], name: 'Third Group'}];

    /* Code for Grid */
    var data = [];
    for (var i = 0; i < 100; i++) {
        data[i] = {};
        for (var j = 0; j < 10; j++) {
            data[i]['j' + j] = j;
        }
    }

    $scope.gridOptions = {
        exporterCsvFilename: 'myFile.csv',
        exporterMenuPdf: false,
        enableSelectAll: true,
        enableRowSelection: true,
        selectionRowHeaderWidth: 35,
        data: data,
    };
    $scope.gridOptions.enableGridMenu = true;

    /*code for select*/
    $scope.sizes = [
      'small (12-inch)',
      'medium (14-inch)',
      'large (16-inch)',
      'insane (42-inch)',
    ];

    /*Code for the chart*/
    c3.generate({
        bindto: '#myChart',
        data: {
            columns: [
              ['data1', 30, 200, 100, 400, 150, 250],
              ['data2', 20, 180, 240, 100, 190, 0],
            ],
            selection: {
                enabled: true,
            },
        },
        subchart: {
            show: true,
        },
        zoom: {
            enabled: true,
        },
    });

    /*Code for tabs*/
    $scope.selectedIndex = 0;
    $scope.nextTab = function() {
        var index = ($scope.selectedIndex === 50) ? 0 : $scope.selectedIndex + 1;
        $scope.selectedIndex = index;
    };

    /*Code for forms*/
    $scope.reset = function(form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
    };

    /*Code for date range picker*/
    $scope.dateRange = {
        startDate: new Date(),
        endDate: new Date()
    };
    $scope.dateRangeTemplateType = 'inline';
    $scope.dateRangeTemplateTypes = ['popup', 'inline'];

    /*Code for time range picker*/
    $scope.timeRange = {
        startTime: new Date('2015-01-01 08:00:00'),
        endTime: new Date('2015-01-01 17:00:00')
    };
    $scope.disableNextDay = false;

    /*Code for modal*/
    $scope.modalShown = false;
    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
    };

    /*code for pagination*/
    $scope.paginationOptions = {pageNumber: 1, totalPages: 7};
    $scope.getPageData = function(pageIndex) {
        //retrieve the data for given page
        angular.log(pageIndex);
    };

    /*code for card list*/
    $scope.items = [{title: 'mdi-chart-bar'}, {title: 'mdi-chart-bar'}];

    /*Code for notices*/
    $scope.displaySuccessNew = function() {
        NoticeService.success('Success: User is saved successfully.', 5000, true);
    };

    $scope.displayInfoNew = function() {
        NoticeService.info('Info: A user logged out.', 5000, true);
    };

    $scope.displayWarningNew = function() {
        NoticeService.warning('Warning: Press refresh as the data was changed by another user.', 5000, true);
    };

    $scope.displayErrorNew = function() {
        NoticeService.error('Error: Something exploded so fix it.', 5000, true);
    };

    /*code for working hours picker*/
    $scope.workingHours = [];

    /*code for numeric value directive*/
    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }

    $scope.numericValueInput = '12,000';
    $scope.numericValueInputResult = 12000;
    $scope.$watch('numericValueInput', function() {
        $scope.numericValueInputResult = Number.isInteger($scope.numericValueInput) ? $scope.numericValueInput :  $scope.numericValueInputResult;
    });
    $scope.numericValueFloatInput = '12,000.50';
    $scope.numericValueFloatInputResult = 12000.50;
    $scope.$watch('numericValueFloatInput', function() {
        if (isFloat($scope.numericValueFloatInput) || Number.isInteger($scope.numericValueFloatInput)) {
            $scope.numericValueFloatInputResult = $scope.numericValueFloatInput;
        }
    });
}]);

})();

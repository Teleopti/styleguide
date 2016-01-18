angular.module('styleguideApp', ['ngMaterial', 'ui.tree', 'ui.grid',
  'ui.grid.autoResize', 'ui.grid.exporter', 'ui.grid.selection', 'ui.bootstrap',
  'angularMoment',  'wfm.cardList', 'wfm.timerangepicker', 'wfm.daterangepicker',
  'angular-growl', 'ngAnimate', 'wfm.pagination'])
.controller('mainCtrl', ['$scope', 'growl', function($scope, growl) {
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




    /*code for pagination*/
    $scope.paginationOptions = {pageNumber: 1, totalPages: 7};
    $scope.getPageData = function(pageIndex) {
        //retrieve the data for given page
        angular.log(pageIndex);
    };

    /*code for card list*/
    $scope.items = [{title: 'mdi-chart-bar'}, {title: 'mdi-chart-bar'}];

    /*code for notices*/
    $scope.displaySuccess = function() {
        growl.success('<i class="mdi mdi-thumb-up"></i> Success: User is saved successfully.', {
            ttl: 5000,
            disableCountDown: true,
        });
    };

    $scope.displayInfo = function() {
        growl.info('<i class="mdi mdi-information"></i> Info: A user logged out.', {
            ttl: 5000,
            disableCountDown: true,
        });
    };

    $scope.displayWarning = function() {
        growl.warning('<i class="mdi mdi-alert"></i> Warning: Press refresh as the data was changed by another user.', {
            ttl: 5000,
            disableCountDown: true,
        });
    };

    $scope.displayError = function() {
        growl.error('<i class="mdi mdi-alert-octagon"></i> Error: Something exploded so fix it.', {
            ttl: 5000,
            disableCountDown: true,
        });
    };
},]);

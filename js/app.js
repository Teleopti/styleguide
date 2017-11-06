(function() {
  'use strict';
  angular.module('styleguideApp', [
    'currentUserInfoService',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
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
    'ui.bootstrap.persian.datepicker',
    'wfm.culturalDatepicker',
    'wfm.cardList',
    'wfm.timerangepicker',
    'wfm.daterangepicker',
    'wfm.workinghourspicker',
    'ngAnimate',
    'wfm.pagination',
    'wfm.modal',
    'wfm.numericValue',
    'wfm.notice',
    'wfm.multiplesearchinput',
    'wfm.rightPanel',
    'wfm.workPicker',
    'wfm.skillPicker',
    'wfm.badge',
    'wfm.btnGroup',
    'wfm.popup',
    'gridshore.c3js.chart'
  ]).config(['$translateProvider', 'tmhDynamicLocaleProvider', function($translateProvider, tmhDynamicLocaleProvider) {
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
    tmhDynamicLocaleProvider.localeLocationPattern('../node_modules/angular-i18n/angular-locale_{{locale}}.js');
  }]).controller('mainCtrl', ['$scope', '$translate','NoticeService', 'tmhDynamicLocale', '$timeout', function($scope, $translate, NoticeService, tmhDynamicLocale, $timeout) {
    $translate.use(window.navigator.language.toLowerCase());
    tmhDynamicLocale.set(window.navigator.language.toLowerCase());

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
      $scope.bigList = [{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'},{id: '5'}, {id: '6'}, {id: '7'}, {id: '8'},
      {id: '9'}, {id: '10'}, {id: '11'}, {id: '12'},{id: '13'}, {id: '14'}, {id: '15'}, {id: '16'}];

      $scope.gridOptions = {
        exporterCsvFilename: 'myFile.csv',
        exporterMenuPdf: false,
        enableSelectAll: true,
        enableFullRowSelection: true,
        enableRowHeaderSelection: true,
        selectionRowHeaderWidth: 35,
        data: data,
      };
      $scope.gridOptions.enableGridMenu = true;

      /*code for chips*/
      $scope.sizes = [
        {Name: 'Small', Type:'Size'},
        {Name: 'Medium', Type:'Size'},
        {Name: 'Large', Type:'Size'},
        {Name: 'Insane', Type:'Size'},
        {Name: 'Infinite', Type:'Size'},
        {Name: 'Mustard', Type:'Dressing'}
      ];

      // code for button group
      $scope.demoArr = ['item1', 'item2', 'item3'];
      $scope.outputCallback1 = function (output) {
        $scope.outputItem1 = output;
      }
      $scope.outputCallback2 = function (output) {
        $scope.outputItem2 = output;
      }

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
      $scope.dateRangeCustomValidators = [{
        key: 'lessThan7Days',
        message: 'DateRangeMustBeLessThanSevenDays',
        validate: function(start, end) {
          return moment(end).diff(moment(start), 'days') <= 7;
        }
      }];

      /*Code for time range picker*/
      $scope.timeRange = {
        startTime: new Date(2016, 0, 1, 8),
        endTime: new Date(2016, 0, 1, 17)
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
      $scope.items = [{title: 'mdi-chart-bar', bool: true}, {title: 'mdi-chart-bar', bool: false}, {title: 'mdi-chart-bar', bool: true}];

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

      /*code for multiple input*/
      $scope.searchOptions = {
        keyword: '',
        searchKeywordChanged: false,
        searchFields: [
          'option1','option2','option3','option4','option5','option6'
        ]
      };

      /*code for skillpicker*/
      $scope.mockSkills = [
        {
          Id: 'XYZ',
          Name: 'skill1'
        },
        {
          Id: 'ABC',
          Name: 'skill2'
        }
      ];
      $scope.mockedSkillGroups = [
        {
          Name: 'SkillArea1',
          Id: '123',
          Skills: [
            {
              Id: 'XYZ',
              Name: 'skill1'
            }
          ]
        },
        {
          Name: 'SkillArea2',
          Id: '321',
          Skills: [
            {
              Id: 'ABC',
              Name: 'skill2'
            }
          ]
        }
      ];
      $scope.preselected = {skillIds: ['XYZ']};
      $scope.output = function (selectedItem){
        $scope.filterOutput = selectedItem;
      }

      /*code for rightPanel*/
      $scope.rightPanelOptions = {
        panelState: false,
        sidePanelTitle: 'Sidepanel title',
        showCloseButton: true,
        showResizer: true,
        showBackdrop: true,
        showPopupButton: true
      };

      // code for homepage
      $scope.menuItems = [];
      $scope.addItemToList = function (url, header) {
        var item = {
          Link: '<a href="' + url + '"><li>'+ header +'</li></a>',
          Name: header
        }
        if ($scope.menuItems.indexOf(item) == -1) {
          $scope.menuItems.push(item);
        }
      }
      $scope.getChapteIcon = function (index) {
        if (index == 'Overview') {return 'mdi-airballoon'}
        if (index == 'Elements') {return 'mdi-puzzle'}
        if (index == 'Components') {return 'mdi-cube-outline'}
        if (index == 'Colors') {return 'mdi-invert-colors'}
        if (index == 'Containers') {return 'mdi-border-none'}
        if (index == 'Tree') {return 'mdi-file-tree'}
        if (index == 'Language') {return 'mdi-sort-alphabetical'}
        if (index == 'Icons') {return 'mdi-image-filter-vintage'}
        if (index == 'Helper classes') {return 'mdi-auto-fix'}
        if (index == 'Naming and best practice') {return 'mdi-crown'}
        if (index == 'Resources') {return 'mdi-school'}
      }

      /*code for numeric value directive*/
      function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
      }

      // timer
      $scope.loading = function () {
        $scope.waitAMoment = true;
        $timeout( function(){
          $scope.waitAMoment = false;
        }, 5000 );
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

    angular.module('currentUserInfoService', [])
    .service('CurrentUserInfo', function() {
      this.CurrentUserInfo = function () {
        var dateFormatLocale = 'en-GB';
        return {
          DateFormatLocale: dateFormatLocale
        };
      };
    });
  })();

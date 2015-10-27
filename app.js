var app = angular.module('styleguideApp', ['ngMaterial', 'ui.grid', 'ui.grid.autoResize', 'ui.grid.exporter', 'ui.grid.selection', 'ui.bootstrap', 'angularMoment',  'wfm.cardList', 'wfm.daterangepicker', 'wfm.timerangepicker'])
.controller('mainCtrl', function ($scope) {

  /* Dummy data*/
    $scope.demos = [ {"id": "50d5ad" } , {"id": "678ffr" },{"id": "515ad" } , {"id": "673ffr" } ];

  /*
  * Code for Grid
  */
  var data = [];
  for(var i=0; i<100;i++){
    data[i]={}
    for(var j=0;j<10;j++){
	    data[i]["j"+j]=j;
    }
  }
  $scope.gridOptions = {
    exporterCsvFilename: 'myFile.csv',
    exporterMenuPdf: false,
    enableSelectAll: true,
    enableRowSelection: true,
    selectionRowHeaderWidth: 35,
    data:data
  };
  $scope.gridOptions.enableGridMenu = true;

  /*code for select*/
  $scope.sizes = [
    "small (12-inch)",
    "medium (14-inch)",
    "large (16-inch)",
    "insane (42-inch)"
  ];


  /*Code for the chart*/
var chart = c3.generate({
    bindto: '#myChart',
    data: {
        columns: [
			['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 20, 180, 240, 100, 190,0]
        ],
        selection: {
    enabled: true
  }
    },
    subchart: {
        show: true
    },
	zoom: {
        enabled: true
    }
});

/*Code for forms*/
 $scope.reset = function(form) {
   if (form) {
     form.$setPristine();
     form.$setUntouched();
   }
 };




/*code for card list*/
	$scope.items = [{ title: 'mdi-chart-bar' }, { title: 'mdi-chart-bar' }];

/*code for pagination*/
  $scope.pageCount = 7;
  $scope.currentPage = 3;
  $scope.firstPage = function(){
    $scope.seekPage(1);
  }
  $scope.previousPage = function(){
    $scope.seekPage($scope.currentPage - 1);
  }
  $scope.seekPage = function(page){
    $scope.currentPage = page;
  }
  $scope.nextPage = function(){
    $scope.seekPage($scope.currentPage + 1);
  }
  $scope.lastPage = function(){
    $scope.seekPage($scope.pageCount);
  }

  $scope.disableNextDay = false;
    
  $scope.getVisiblePages = function (start, end) {
		var displayPageCount = 5;
		var ret = [];
		if (!end) {
			end = start;
			start = 1;
		}

		var leftBoundary = start;
		var rightBoundary = end;
		if (end - start >= displayPageCount) {
			var currentPage = $scope.currentPage;

			if (currentPage < displayPageCount - 1) {
				leftBoundary = 1;
				rightBoundary = displayPageCount;
			} else if (end - currentPage < 3) {
				leftBoundary = end - displayPageCount + 1;
				rightBoundary = end;
			} else {
				leftBoundary = currentPage - Math.floor(displayPageCount / 2) > 1 ? currentPage - Math.floor(displayPageCount / 2) : 1;
				rightBoundary = currentPage + Math.floor(displayPageCount / 2) > end ? end : currentPage + Math.floor(displayPageCount / 2);
			}
		}

		for (var i = leftBoundary; i <= rightBoundary ; i++) {
			ret.push(i);
		}

		return ret;
	};

});


var app = angular.module('styleguideApp', ['ngMaterial', 'ui.grid', 'ui.grid.autoResize', 'ui.grid.exporter', 'ui.grid.selection', 'ui.bootstrap', 'angularMoment',  'wfm.cardList', 'wfm.daterangepicker', 'wfm.timerangepicker'])
.controller('mainCtrl', function ($scope) {
  /* Dummy data*/
    $scope.demos = [ {"id": "50d5ad" } , {"id": "678ffr" },{"id": "50d5ad" } , {"id": "678ffr" } ];
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



/*code for card list*/
	$scope.items = [{ title: 'mdi-chart-bar' }, { title: 'mdi-chart-bar' }];


});
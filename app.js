var app = angular.module('styleguideApp', ['ngMaterial', 'ui.grid', 'ui.grid.autoResize', 'ui.grid.exporter', 'ui.grid.selection', 'ui.bootstrap','teleopti.wfm.cardList'])
.controller('mainCtrl', function ($scope) {
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


  /*Code for the chart*/
var chart = c3.generate({
    bindto: '#myChart',
    data: {
        columns: [
			['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 20, 180, 240, 100, 190,0]
        ]
    },
    subchart: {
        show: true
    },
	zoom: {
        enabled: true
    }
});


/*rangepicker*/
  $scope.setRangeClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(12,0,0,0);
      var startDay = new Date($scope.startDate).setHours(12,0,0,0);
      var endDay = new Date($scope.endDate).setHours(12,0,0,0);
      
      if (dayToCheck >= startDay && dayToCheck < endDay) {
        return 'range';
      }
    }
    return '';
  };

/*code for card list*/
	$scope.items = [{ title: 'mdi-chart-bar' }, { title: 'mdi-chart-bar' }, { title: 'mdi-chart-bar' }, { title: 'mdi-chart-bar' }];


});
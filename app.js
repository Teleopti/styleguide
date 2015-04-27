var app = angular.module('styleguideApp', ['ngMaterial', 'ui.grid', 'ui.grid.autoResize', 'ui.grid.exporter', 'ui.grid.selection', 'ui.bootstrap'])
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

  /*
  * Code for datepicker
  */
  $scope.dayInRange = function(date, mode) {
    console.log('inRange');
  };

	$scope.timePickerUseMeridian = true;

});
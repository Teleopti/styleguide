var app = angular.module('styleguideApp', ['ngMaterial', 'ui.grid',  'ui.grid.autoResize'])
.controller('mainCtrl',function($scope){
			var data = [];
			for(var i=0; i<100;i++){
				data[i]={}
				/*data[i]={
				"firstName": "Cox",
				"lastName": "Carney "+i}
				;*/
				for(var j=0;j<10;j++){
					data[i]["j"+j]=j;
				}
			}
			$scope.gridOptions = {
				
				minWidth: 200,
				data:data
				
			};
			$scope.gridOptions.enableGridMenu = true;
		});
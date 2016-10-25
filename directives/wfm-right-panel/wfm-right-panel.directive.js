'use strict';

(function () {
	var wfmRightPanel = angular.module('wfm.rightPanel', ['angularResizable']);
	wfmRightPanel.controller('wfmRightPanelCtrl', wfmRightPanelCtrl);
	wfmRightPanelCtrl.$inject = ['$mdSidenav', '$scope'];

	function wfmRightPanelCtrl($mdSidenav, $scope) {
		var vm = this;

		vm.openPanel = function () {
			if (!$mdSidenav('right-panel').isOpen()) {
				$mdSidenav('right-panel').open();
				vm.onOpen();
			}
			vm.showPanel = true;
			vm.panelOptions.panelState = true;
		};

		vm.closePanel = function () {
			if ($mdSidenav('right-panel').isOpen()) {
				$mdSidenav('right-panel').close();
				vm.onClose();
			}
			vm.showPanel = false;
			vm.panelOptions.panelState = false;
		};

		$scope.$watch(function () { return vm.panelOptions.panelState }, function (newValue, oldValue) {
			if (newValue) {
				vm.openPanel();
			}
			else {
				vm.closePanel();
			}
		}, true);
	};

	wfmRightPanel.directive('wfmRightPanel', wfmRightPanelDirective);

	function wfmRightPanelDirective() {
		return {
			controller: 'wfmRightPanelCtrl',
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				panelOptions: "=",
				onOpen: "&",
				onClose: "&"
			},
			transclude: true,
			templateUrl: 'app/global/wfmrightpanel/wfmrightpanel.tpl.html',
			link: linkFunction
		}
	};

	function linkFunction(scope, attr, element) {
		scope.vm.panelOptions.panelTitle = scope.vm.panelOptions.panelTitle || "Right Panel";
		scope.vm.panelOptions.showCloseButton = scope.vm.panelOptions.showCloseButton == true;
		scope.vm.panelOptions.showBackdrop = scope.vm.panelOptions.showBackdrop == true;
		scope.vm.panelOptions.showResizer = scope.vm.panelOptions.showResizer == true;
		scope.vm.panelOptions.showPopupButton = scope.vm.panelOptions.showPopupButton == true;

		if (!scope.vm.panelOptions.showResizer) {
			$("wfm-right-panel .resizable .rg-left").hide();
		}
	};
})();

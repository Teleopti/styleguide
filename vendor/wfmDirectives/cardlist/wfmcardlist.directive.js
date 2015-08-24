'use strict';

(function () {
	angular.module('wfm.cardList', []);
})();

(function () {

	function wfmCardDirectiveController() {
		var vm = this;
		vm.isSelected = function () {
			return vm.parentVm.isSelectedCard(vm);
		};
		vm.select = function () {
			vm.parentVm.selectCard(vm);
		}
	};

	function getWfmCardTemplate() {
		return  '<md-card ng-class="vm.isSelected() ? \'wfm-card-selected material-depth-2\' : \'wfm-card-unselected\' ">' +
				'<div ng-click=" vm.select()" class="wfm-card-title" transclude-id="header"></div>' +
				'<div class="wfm-card-content" ng-show="vm.isSelected()">' +
				'<div transclude-id="body"></div>' +
				'</div>' +
				'</md-card>';
	}

	function wfmCardDirective() {

		return {
			controller: 'wfmCardCtrl',
			controllerAs: 'vm',
			bindToController: true,
			scope: {},
			template: getWfmCardTemplate(),
			transclude: true,
			require: ['wfmCard', '^wfmCardList'],
			link: function (scope, elem, attr, ctrl, transcludeFn) {

				var vm = ctrl[0];
				var parentVm = ctrl[1];
				vm.parentVm = parentVm;

				transcludeFn(function (clone) {

					angular.forEach(clone, function (cloneEl) {

						if (cloneEl.nodeType === 3) {
							return;
						}

						var tag;

						if (cloneEl.nodeName == "CARD-HEADER") {
							tag = '[transclude-id="header"]';
						}
						if (cloneEl.nodeName == "CARD-BODY") {
							tag = '[transclude-id="body"]';
						}

						var destination = angular.element(elem[0].querySelector(tag));

						if (destination != null && destination.length) {
							destination.append(cloneEl);

						} else {
							cloneEl.remove();

						}
					});
				});
			}
		};
	};

	angular.module('wfm.cardList').controller('wfmCardCtrl', wfmCardDirectiveController);

	angular.module('wfm.cardList').directive('wfmCard', wfmCardDirective);

}());

(function() {
	angular.module('wfm.cardList')
		.controller('wfmCardListCtrl', function() {

				var vm = this;
				vm.selectedCard = null;
				vm.selectCard = function(card) {
					vm.selectedCard = vm.isSelectedCard(card) ? null : card;
				};
				vm.isSelectedCard = function(card) {
					return vm.selectedCard == card;
				};
			}
		);

	function getWfmCardListTemplate() {
		return '<md-content class="wfm-card-list-container">' +
				'<md-list class="wfm-card-list">' +
				'<md-content ng-transclude>' +
				'</md-content>' +
				'</md-list>' +
				'</md-content>';
	}

	angular.module("wfm.cardList")
		.directive("wfmCardList", function() {
			return {
				controller: 'wfmCardListCtrl',
				controllerAs: 'vm',
				bindToController: true,
				transclude: true,
				template: getWfmCardListTemplate()

			};
		});
}());
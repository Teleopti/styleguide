'use strict';



(function () {
	angular.module('teleopti.wfm.cardList', []);
})();

(function () {

	function teleoptiCardDirectiveController() {

		var vm = this;

		vm.isSelected = function () {
			return vm.parentVm.isSelectedCard(vm);
		};

		vm.select = function () {
			vm.parentVm.selectCard(vm);
		}
	};

	function teleoptiCardDirective() {

		return {
			controller: 'TeleoptiCardCtrl',
			controllerAs: 'vm',
			bindToController: true,
			scope: {},
			templateUrl: "teleopti_card.html",
			transclude: true,
			require: ['teleoptiCard', '^teleoptiCardList'],
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

	angular.module('teleopti.wfm.cardList').controller('TeleoptiCardCtrl', teleoptiCardDirectiveController);

	angular.module('teleopti.wfm.cardList').directive('teleoptiCard', teleoptiCardDirective);

}());

(function() {
	angular.module('teleopti.wfm.cardList')
		.controller('TeleoptiCardListCtrl', function() {

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

	angular.module("teleopti.wfm.cardList")
		.directive("teleoptiCardList", function() {
			return {
				controller: 'TeleoptiCardListCtrl',
				controllerAs: 'vm',
				bindToController: true,
				transclude: true,
				templateUrl: "teleopti_card_list.html"

			};
		});
}());
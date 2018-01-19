(function() {
    'use strict';
    angular.module('wfm.cardList', []);

    function wfmCardDirectiveController() {
        /* jshint validthis: true */
        var vm = this;
        vm.isSelected = function() {
            return vm.parentVm.isSelectedCard(vm);
        };

        vm.select = function() {
            vm.parentVm.selectCard(vm);
        };
    }

    function getWfmCardTemplate() {
        return '<md-card ng-class="vm.isSelected() ? \'wfm-card-selected material-depth-2\' : \'wfm-card-unselected\' ">' +
            '<div ng-click="vm.select()" tabindex="-1" class="wfm-card-title" transclude-id="header"></div>' +
            '<div class="wfm-card-content animate-show" ng-show="vm.isSelected()">' +
            '<div transclude-id="body"></div>' +
            '</div>' +
            '</md-card>';
    }

    function wfmCardDirective() {

        return {
            controller: 'wfmCardCtrl',
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                openByDefault: '=open'
            },
            template: getWfmCardTemplate(),
            transclude: true,
            require: ['wfmCard', '^wfmCardList'],
            link: function(scope, elem, attr, ctrl, transcludeFn) {

                var vm = ctrl[0];
                vm.id = scope.$id;

                var parentVm = ctrl[1];
                vm.parentVm = parentVm;

                if (vm.openByDefault) {
                    vm.select();
                }
                transcludeFn(function(clone) {

                    angular.forEach(clone, function(cloneEl) {

                        if (cloneEl.nodeType === 3) {
                            return;
                        }

                        var tag;

                        if (cloneEl.nodeName === 'CARD-HEADER') {
                            tag = '[transclude-id="header"]';
                        }
                        if (cloneEl.nodeName === 'CARD-BODY') {
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
    }

    angular.module('wfm.cardList').controller('wfmCardCtrl', wfmCardDirectiveController);

    angular.module('wfm.cardList').directive('wfmCard', wfmCardDirective);

    angular.module('wfm.cardList')
        .controller('wfmCardListCtrl', function() {

            var vm = this;
            vm.selectedCards = {};

            vm.selectCard = function(card) {

                var cardSelected = (vm.selectedCards[card.id] === undefined);

                if (!vm.allowMultiSelect) {
                    vm.selectedCards = {};
                }

                if (cardSelected) {
                    vm.selectedCards[card.id] = card;
                } else {
                    delete vm.selectedCards[card.id];
                }
            };

            vm.isSelectedCard = function(card) {
                return vm.selectedCards[card.id] !== undefined;
            };
        });

    function getWfmCardListTemplate() {
        return '<md-content class="wfm-card-list-container">' +
            '<md-list class="wfm-card-list">' +
            '<md-content ng-transclude>' +
            '</md-content>' +
            '</md-list>' +
            '</md-content>';
    }

    angular.module('wfm.cardList')
        .directive('wfmCardList', function() {
            return {
                controller: 'wfmCardListCtrl',
                controllerAs: 'vm',
                bindToController: true,
                transclude: true,
                template: getWfmCardListTemplate(),
                link: linkFunction,
                scope: true
            };
        });

    function linkFunction(scope, element, attributes, vm) {
        vm.allowMultiSelect = 'multiSelect' in attributes;
    }

}());

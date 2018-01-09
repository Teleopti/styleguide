(function () {
    'use strict';
    angular
        .module('wfm.card-panel', [])
        .component('cardPanel', {
            templateUrl: 'directives/card-panel/card-panel.template.tpl.html',
            controller: 'CardPanelController',
            controllerAs: 'vm',
            transclude: {
                'header': '?cardPanelHeader',
                'content': '?cardPanelContent'
            },
            bindings: {
                id: '<',
                open: '@',
                preOpen: '<',
                color: '<',
                colorCondition: '<',
            }
        })
        .directive('cardAnimate', cardAnimate)
        .controller('CardPanelController', CardPanelController);

    CardPanelController.$inject = ['$element'];

    function CardPanelController($element) {
        var vm = this;

        vm.$onInit = setColorRender();

        function setColorRender() {
            if (angular.isDefined(vm.color)) {
                switch (vm.color.render) {
                    case undefined:
                        break;
                    case 'linear':
                        vm.setColor = linearColor;
                        break;
                    case 'class':
                        vm.setColorClass = setColorByClass;
                        break;
                    case 'condition':
                        vm.setColorClass = setColorByCondition;
                        break;
                }
            }
            return;
        }

        function linearColor() {
            var length = $element[0].parentNode.getElementsByTagName('card-panel').length;
            if (angular.isDefined(vm.id) && angular.isDefined(vm.color.rgba)) {
                var opacity = 1 - vm.id / length;
                vm.color.rgba = vm.color.rgba.replace(/[\d\.]+\)$/g, opacity.toFixed(2) + ')');
                return {
                    'border-color': vm.color.rgba,
                }
            }
            return;
        }

        function setColorByClass() {
            if (angular.isDefined(vm.color.className)) {
                return vm.color.className;
            }
            return;
        }

        function setColorByCondition() {
            if (angular.isDefined(vm.color.condition) && angular.isDefined(vm.colorCondition) && angular.isDefined(vm.color.condition[vm.colorCondition])) {
                return vm.color.condition[vm.colorCondition]
            }
            return;
        }
    }

    function cardAnimate() {
        var directive = {
            restrict: 'EA',
            link: linkFunc,
        };

        return directive;

        function linkFunc(scope, element, attrs) {
            var el = element[0];

            var selectedCardContent = el.nextElementSibling;
            var allCards;

            init();

            function init() {
                if (attrs.cardAnimate == 'single' || attrs.preOpen == 'true') {
                    allCards = el.parentNode.parentNode.parentNode.getElementsByClassName('card-panel-content-wrapper');
                }
                preOpen();
                switch (attrs.cardAnimate) {
                    default:
                        multipleOpen();
                        break;
                    case 'single':
                        singleOpen();
                        break;
                }
                return;
            }

            function preOpen() {
                if (attrs.preOpen == 'true') {
                    if (attrs.id !== '' && allCards[attrs.id].classList.contains('hidden')) {
                        return allCards[attrs.id].classList.remove('hidden');
                    }
                    return toggleCard();
                }
                return;
            }

            function singleOpen() {
                el.addEventListener(
                    'click',
                    function () {
                        for (var i = 0; i < allCards.length; i++) {
                            if (allCards[i].id !== selectedCardContent.id) {
                                allCards[i].classList.add('hidden');
                            } else {
                                toggleCard();
                            }
                        }
                    }
                );
            }

            function multipleOpen() {
                el.addEventListener(
                    'click',
                    function () {
                        toggleCard();
                    }
                );
            }

            function toggleCard() {
                var style = selectedCardContent.classList;
                if (style.contains('hidden')) {
                    return style.remove('hidden');
                } else {
                    return style.add('hidden');
                }
            }

        }
    }
})();

(function () {
    'use strict';

    angular
        .module('wfm.treePicker', [])
        .component('treeDataOne', {
            templateUrl: 'directives/tree-picker/tree_data.tpl.html',
            require: {
                ngModel: 'ngModel'
            },
            controller: 'TreeDataOneController',
            controllerAs: 'vm',
            bindings: {
                option: '='
            }
        })
        .component('treeDataTwo', {
            templateUrl: 'directives/tree-picker/tree_data.tpl.html',
            require: {
                ngModel: 'ngModel'
            },
            controller: 'TreeDataTwoController',
            controllerAs: 'vm',
            bindings: {
                option: '='
            }
        })
        .controller('TreeDataOneController', TreeDataOneController)
        .controller('TreeDataTwoController', TreeDataTwoController)
        .directive('treeAnimate', treeAnimate);

    TreeDataOneController.$inject = ['$element', '$timeout'];
    TreeDataTwoController.$inject = ['$element', '$timeout', '$attrs'];

    function TreeDataOneController($element, $timeout) {
        var vm = this;

        var updateView = false;
        vm.node;
        vm.nodeDisplayName = 'name';
        vm.nodeChildrenName = 'children';
        vm.nodeSelectedMark = 'mark';
        vm.selectNode = selectNode;

        vm.$onInit = fetchSetting;

        function fetchSetting() {
            if (angular.isDefined(vm.option)) {
                vm.nodeDisplayName = vm.option.NodeDisplayName ? vm.option.NodeDisplayName : 'name';
                vm.nodeChildrenName = vm.option.NodeChildrenName ? vm.option.NodeChildrenName : 'children';
                vm.nodeSelectedMark = vm.option.NodeSelectedMark ? vm.option.NodeSelectedMark : 'mark';
            }
            vm.ngModel.$viewChangeListeners.push(onChange);
            vm.ngModel.$render = onChange;
            return;
        }

        function onChange() {
            var check = angular.equals(vm.ngModel.$modelValue, vm.data);
            if (!check) {
                vm.data = vm.ngModel.$modelValue;
            }
        }

        function selectNode(item) {
            vm.node = item;
            var state = !item.$parent.node[vm.nodeSelectedMark];
            item.$parent.node[vm.nodeSelectedMark] = state;
            if (!state) {
                if (item.$parent.node[vm.nodeChildrenName] && item.$parent.node[vm.nodeChildrenName].length !== 0) {
                    setChildrenNodesToUnselect(item.$parent.node[vm.nodeChildrenName]);
                }
            } else {
                setParentNodesSelectState(item.$parent, true);
            }
            return updateNgModelDateForTreePicker();
        }

        function updateNgModelDateForTreePicker() {
            var update = angular.copy(vm.data);
            return vm.ngModel.$setViewValue(update);
        }

        function setChildrenNodesToUnselect(children) {
            children.forEach(function (child) {
                child[vm.nodeSelectedMark] = false;
                if (child[vm.nodeChildrenName] && child[vm.nodeChildrenName].length !== 0) {
                    return setChildrenNodesToUnselect(child[vm.nodeChildrenName]);
                }
            });
        }

        function setParentNodesSelectState(data, state) {
            data.node[vm.nodeSelectedMark] = state;
            if (data.$parent.$parent.node) {
                return setParentNodesSelectState(data.$parent.$parent, state);
            }
        }
    }

    function TreeDataTwoController($element, $timeout, $attrs) {
        var vm = this;

        var updateView = false;
        var rootSelectUnique = 'false';
        var lastChange = [];
        vm.node;
        vm.nodeDisplayName = 'name';
        vm.nodeChildrenName = 'children';
        vm.nodeSelectedMark = 'mark';
        vm.selectNode = selectNode;

        vm.$onInit = fetchSetting;

        function fetchSetting() {
            if (angular.isDefined(vm.option)) {
                vm.nodeDisplayName = vm.option.NodeDisplayName ? vm.option.NodeDisplayName : 'name';
                vm.nodeChildrenName = vm.option.NodeChildrenName ? vm.option.NodeChildrenName : 'children';
                vm.nodeSelectedMark = vm.option.NodeSelectedMark ? vm.option.NodeSelectedMark : 'mark';
                vm.NodeSemiSelected = vm.option.NodeSemiSelected ? vm.option.NodeSemiSelected : 'semiSelected';
                rootSelectUnique = vm.option.RootSelectUnique ? vm.option.RootSelectUnique : false;
            }
            vm.ngModel.$viewChangeListeners.push(onChange);
            vm.ngModel.$render = onChange;
            return;
        }

        function onChange() {
            var check = angular.equals(vm.ngModel.$modelValue, vm.data);
            if (!check) {
                vm.data = vm.ngModel.$modelValue;
                $timeout(function () {
                    var selectedItems = $element[0].getElementsByClassName('selected-true');
                    for (var index = 0; index < selectedItems.length; index++) {
                        var item = selectedItems[index];
                        var check = lastChange.some(function (last) {
                            return last == item.$$hashKey;
                        })
                        if (!check) {
                            updateView = true;
                            item.click();
                            lastChange.push(item.$$hashKey);
                        }
                    }
                });
            }
        }

        function selectNode(item) {
            vm.node = item;
            var state = generateState(item);
            resetSemiState(item);
            if (rootSelectUnique) {
                var rootIndex = mapParentIndex(item)[0];
                setSiblingsToUnselect(vm.data[vm.nodeChildrenName], rootIndex);
            }
            if (item.$parent.$parent.$parent.node && item.$parent.$parent.$parent.node[vm.nodeChildrenName].length !== 0) {
                setParentNodesSelectState(item.$parent.$parent.$parent);
            }
            if (item.$parent.node[vm.nodeChildrenName] && item.$parent.node[vm.nodeChildrenName].length !== 0) {
                setChildrenNodesSelectState(item.$parent.node[vm.nodeChildrenName], state);
            }
            return updateNgModelDateForTreePicker();
        }

        function generateState(item) {
            var state;
            if (updateView) {
                return state = item.$parent.node[vm.nodeSelectedMark];
            } else {
                state = !item.$parent.node[vm.nodeSelectedMark];
                item.$parent.node[vm.nodeSelectedMark] = state;
                return state;
            }
        }

        function resetSemiState(item) {
            return item.$parent.node[vm.NodeSemiSelected] = false;
        }

        function updateNgModelDateForTreePicker() {
            if (updateView) {
                updateView = false;
                return vm.ngModel.$setViewValue(vm.data);
            } else {
                var update = angular.copy(vm.data);
                return vm.ngModel.$setViewValue(update);
            }
        }

        function setChildrenNodesSelectState(children, state) {
            children.forEach(function (child) {
                child[vm.nodeSelectedMark] = state;
                child[vm.NodeSemiSelected] = false;
                if (child[vm.nodeChildrenName] && child[vm.nodeChildrenName].length !== 0) {
                    return setChildrenNodesSelectState(child[vm.nodeChildrenName], state);
                }
            });
        }

        function setParentNodesSelectState(data) {
            var checkAll = siblingsHasAllSelected(data.node[vm.nodeChildrenName]);
            var checkSemi = siblingsHasSemiSelected(data.node[vm.nodeChildrenName]);
            data.node[vm.nodeSelectedMark] = checkAll;
            data.node[vm.NodeSemiSelected] = !checkAll && checkSemi;
            if (data.$parent.$parent.node) {
                return setParentNodesSelectState(data.$parent.$parent);
            }
        }

        function siblingsHasSemiSelected(siblings) {
            return siblings.some(function (item) {
                if (item[vm.nodeSelectedMark] || item[vm.NodeSemiSelected]) {
                    return item[vm.nodeSelectedMark] == true || item[vm.NodeSemiSelected] == true;
                }
                return false;
            })
        }

        function siblingsHasAllSelected(siblings) {
            return !siblings.some(function (item) {
                if (item[vm.nodeSelectedMark]) {
                    return item[vm.nodeSelectedMark] == false;
                }
                return true;
            })
        }

        function mapParentIndex(item, indexList) {
            if (indexList == null) {
                var indexList = [];
            }
            if (angular.isDefined(item.$parent.$index)) {
                indexList.splice(0, 0, item.$parent.$index);
                mapParentIndex(item.$parent.$parent, indexList)
            }
            return indexList;
        }

        function setSiblingsToUnselect(item, index) {
            item.forEach(function (child, i) {
                if (i !== index) {
                    item[i][vm.nodeSelectedMark] = false;
                    item[i][vm.NodeSemiSelected] = false;
                    setChildrenNodesSelectState(child[vm.nodeChildrenName], false);
                }
            });
        }
    }

    function treeAnimate() {
        var directive = {
            restrict: 'EA',
            link: linkFunc,
        };

        return directive;

        function linkFunc(scope, element, attrs, ctrl) {
            var el = element[0];
            el.children[0].addEventListener(
                'click',
                function () {
                    var icon = el.getElementsByTagName('i')[0].classList;
                    if (icon.contains('mdi-chevron-right')) {
                        icon.remove('mdi-chevron-right');
                        icon.add('mdi-chevron-down');
                        return OpenByRoot(el);
                    }
                    if (icon.contains('mdi-chevron-down')) {
                        icon.remove('mdi-chevron-down');
                        icon.add('mdi-chevron-right');
                        return CloseByRoot(el);
                    }
                }
            );

            function CloseByRoot(el) {
                var subTree = el.nextElementSibling.getElementsByTagName('li');
                for (var i = 0; i < subTree.length; i++) {
                    if (!subTree[i].classList.contains('hidden')) {
                        subTree[i].classList.add('hidden');
                    }
                    var icon = subTree[i].getElementsByTagName('i')[0].classList;
                    if (icon.contains('mdi-chevron-down')) {
                        icon.remove('mdi-chevron-down');
                        icon.add('mdi-chevron-right');
                    }
                }
            }

            function OpenByRoot(el) {
                var children = el.nextElementSibling.children;
                for (var i = 0; i < children.length; i++) {
                    children[i].classList.remove('hidden');
                }
            }
        }
    }
})();

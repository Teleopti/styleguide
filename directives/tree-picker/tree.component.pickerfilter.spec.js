describe('TreeFilterFeature', function () {
    var vm,
        $controller,
        $compile,
        $rootScope,
        attachedElements = [],
        data,
        picker,
        componentData,
        componentOption,
        rootSelectUnique,
        option = {
            NodeDisplayName: 'label',
            NodeChildrenName: 'nodes',
            NodeSelectedMark: 'selected',
            DisplayTreeFilter: true
        };

    beforeEach(function () {
        module('styleguide.templates', 'wfm.treePicker');
        inject(function (_$controller_, _$compile_, _$rootScope_) {
            $controller = _$controller_;
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
        data = {
            nodes: [
                {
                    label: 'parent1',
                    id: '1',
                    selected: false,
                    nodes: [
                        {
                            label: 'child1',
                            id: '2',
                            selected: false,
                            nodes: [
                                {
                                    label: 'grandchild1',
                                    id: '3',
                                    selected: false,
                                    nodes: [
                                        {
                                            label: 'child1',
                                            id: '12',
                                            selected: false,
                                            nodes: [
                                                {
                                                    label: 'grandchild1',
                                                    id: '13',
                                                    selected: false,
                                                    nodes: []
                                                }
                                            ]
                                        },
                                        {
                                            label: 'child1',
                                            id: '22',
                                            selected: false,
                                            nodes: [
                                                {
                                                    label: 'grandchild2',
                                                    id: '23',
                                                    selected: false,
                                                    nodes: []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    label: 'grandchild30',
                                    id: '33',
                                    selected: false,
                                    nodes: [
                                        {
                                            label: 'child31',
                                            id: '12',
                                            selected: false,
                                            nodes: [
                                                {
                                                    label: 'grandchild312',
                                                    id: '13',
                                                    selected: false,
                                                    nodes: []
                                                }
                                            ]
                                        },
                                        {
                                            label: 'child32',
                                            id: '22',
                                            selected: false,
                                            nodes: [
                                                {
                                                    label: 'grandchild321',
                                                    id: '23',
                                                    selected: false,
                                                    nodes: []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'parent2',
                    id: '4',
                    selected: false,
                    nodes: [
                        {
                            label: 'child1',
                            id: '5',
                            selected: false,
                            nodes: [
                                {
                                    label: 'grandchild1',
                                    id: '6',
                                    selected: false,
                                    nodes: []
                                }
                            ]
                        },
                        {
                            label: 'child2',
                            id: '7',
                            selected: false,
                            nodes: [
                                {
                                    label: 'grandchild2',
                                    id: '8',
                                    selected: false,
                                    nodes: []
                                }
                            ]
                        },
                        {
                            label: 'child3',
                            id: '7',
                            selected: false,
                            nodes: [
                                {
                                    label: 'grandchild1',
                                    id: '8',
                                    selected: false,
                                    nodes: []
                                },
                                {
                                    label: 'grandchild2',
                                    id: '8',
                                    selected: false,
                                    nodes: []
                                },
                                {
                                    label: 'grandchild3',
                                    id: '8',
                                    selected: false,
                                    nodes: []
                                },
                                {
                                    label: 'grandchild4',
                                    id: '8',
                                    selected: false,
                                    nodes: []
                                },
                                {
                                    label: 'grandchild5',
                                    id: '8',
                                    selected: false,
                                    nodes: []
                                }
                            ]
                        },
                        {
                            label: 'child4',
                            id: '7',
                            selected: false,
                            nodes: [
                                {
                                    label: 'grandchild2',
                                    id: '8',
                                    selected: false,
                                    nodes: []
                                }
                            ]
                        },
                        {
                            label: 'child5',
                            id: '7',
                            selected: false,
                            nodes: [
                                {
                                    label: 'grandchild2',
                                    id: '8',
                                    selected: false,
                                    nodes: []
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        $rootScope.data = data;
        $rootScope.option = option;
        picker = setupPicker('ng-model="data" option="option"');
        componentData = picker.find('div').scope().vm.data;
        componentOption = picker.find('div').scope().vm.option;
        vm = picker.find('div').scope().vm;
    });

    afterEach(function () {
        attachedElements.forEach(function (element) {
            var scope = element.scope();
            scope && scope.$destroy();
            element.remove();
        });
        attachedElements = [];
    });

    function setupPicker(attrs, scope, optCompileOpts) {
        var el;
        var template = '' +
            '<tree-data-two ' + (attrs || '') + '>' +
            '</tree-data-two>';

        el = $compile(template)(scope || $rootScope);
        $rootScope.$digest();

        attachedElements.push(el);

        return el;
    }

    function changeFilterValue(value) {
        var el = picker[0].getElementsByTagName('input')[0];
        el.value = value;
        el.dispatchEvent(new Event('change'));
    }

    function findPointInTree(treeName) {
        var tree = picker[0].getElementsByClassName('tree-handle-wrapper');
        for (var index = 0; index < tree.length; index++) {
            if (tree[index].innerText == treeName) {
                var treePoint = tree[index];
                break;
            }
        };
        return treePoint;
    }

    it('should ensure that the filter works', function () {
        var treeBeforeFilterInput = picker[0].getElementsByClassName('filter-hidden').length;
        changeFilterValue('2');
        var treeAfterFilterInput = picker[0].getElementsByClassName('filter-hidden').length;
        var disableNormalHidden = picker[0].getElementsByClassName('hidden').length;

        expect(picker.find('div').scope().vm.search).toEqual('2');
        expect(treeBeforeFilterInput).not.toEqual(treeAfterFilterInput);
        expect(disableNormalHidden).toEqual(0);
    });

    it('[while the tree point has one child] should display all children to parent that matched with filter value', function () {
        changeFilterValue('child3');
        var parent = findPointInTree('child3').parentNode.parentNode;
        var children = parent.getElementsByTagName('li');

        expect(children.length).toEqual(5);
    });

    it('[while the tree point have many levels of children] should display all children of parent that matched with filter value', function () {
        changeFilterValue('parent1');
        var parent = findPointInTree('parent1').parentNode.parentNode;
        var children = parent.getElementsByTagName('li');

        expect(children.length).toEqual(11);
    });

    it('[while the tree point has one child level and a sibling has one level] should not display any children of parent that is a sibling of the filter value match', function () {
        changeFilterValue('child3');
        var parent = findPointInTree('child2').parentNode.parentNode;
        var children = parent.getElementsByTagName('li');

        expect(children[0].classList).toContain('filter-hidden');
    });

    it('[while the tree point has many levels of children and a sibling has one level] should not display any children of sibling of the filter value match', function () {
        changeFilterValue('grandchild30');
        var parent = findPointInTree('grandchild1').parentNode.parentNode;
        var children = parent.getElementsByTagName('li');

        expect(children[0].classList).toContain('filter-hidden');
    });

    it('[while the tree point has no children but has siblings] should not display any siblings of the filter value match', function () {
        changeFilterValue('grandchild4');
        var parent = findPointInTree('child3').parentNode.parentNode;
        var children = parent.getElementsByTagName('li');

        expect(children[0].classList).toContain('filter-hidden');
        expect(children[3].innerText).toContain('grandchild4');
    });

    it('should turn off filter feature while search string is null', function () {
        changeFilterValue('grandchild4');
        changeFilterValue('');
        var treeAfterFilterInput = picker[0].getElementsByClassName('filter-hidden').length;
        var disableNormalHidden = picker[0].getElementsByClassName('hidden').length;

        expect(treeAfterFilterInput).toEqual(0);
        expect(disableNormalHidden).not.toEqual(0);
    });

});

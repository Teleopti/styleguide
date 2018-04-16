describe('TreeDataTwoController', function () {
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
            NodeSelectedMark: 'selected'
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

    function mapParentIndex(item, indexList) {
        if (angular.isUndefined(item)) {
            return;
        }
        if (indexList == null) {
            var indexList = [];
        }
        if (angular.isDefined(item.$parent.$index)) {
            indexList.splice(0, 0, item.$parent.$index);
            mapParentIndex(item.$parent.$parent, indexList)
        }
        return indexList;
    }

    it('should prepare data form other controller to component', function () {
        expect(componentData).toEqual(data);
        expect(componentData.nodes[0][componentOption.NodeDisplayName]).toEqual('parent1');
        expect(componentData.nodes[0][componentOption.NodeChildrenName].length).toEqual(1);
    });

    it('should be able to select a node', function () {
        var nodes = picker[0].getElementsByClassName('tree-handle-wrapper');
        nodes[0].click();
        var componentSelectedNode = picker.find('div').scope().vm.node;

        expect(componentSelectedNode.$parent.node[componentOption.NodeSelectedMark]).toEqual(true);
    });

    it('should be able to unselect a node', function () {
        var nodes = picker[0].getElementsByClassName('tree-handle-wrapper');
        nodes[0].click();
        nodes[0].click();
        var componentSelectedNode = picker.find('div').scope().vm.node;

        expect(componentSelectedNode.$parent.node[componentOption.NodeSelectedMark]).toEqual(false);
    });

    it('should select the clicked node and its parents', function () {
        var nodes = picker[0].getElementsByClassName('tree-handle-wrapper');
        nodes[4].click();
        var componentSelectedNode = picker.find('div').scope().vm.node;
        var mapParents = mapParentIndex(componentSelectedNode);

        expect(data.nodes[mapParents[0]].semiSelected).toEqual(true);
        expect(data.nodes[mapParents[0]].nodes[mapParents[1]].semiSelected).toEqual(true);
        expect(data.nodes[mapParents[0]].nodes[mapParents[1]].nodes[mapParents[2]].semiSelected).toEqual(true);
        expect(data.nodes[mapParents[0]].nodes[mapParents[1]].nodes[mapParents[2]].nodes[mapParents[3]].selected).toEqual(true);
        expect(data.nodes[mapParents[0]].nodes[mapParents[1]].nodes[mapParents[2]].nodes[mapParents[3]].nodes[mapParents[4]].selected).toEqual(true);
    });

    it('should unselect everything when unselecting a parent with only one child', function () {
        var nodes = picker[0].getElementsByClassName('tree-handle-wrapper');
        nodes[4].click();
        nodes[3].click();
        var componentSelectedNode = picker.find('div').scope().vm.node;
        var mapParents = mapParentIndex(componentSelectedNode);

        expect(data.nodes[mapParents[0]].selected).toEqual(false);
        expect(data.nodes[mapParents[0]].nodes[mapParents[1]].selected).toEqual(false);
        expect(data.nodes[mapParents[0]].nodes[mapParents[1]].nodes[mapParents[2]].selected).toEqual(false);
        expect(data.nodes[mapParents[0]].nodes[mapParents[1]].nodes[mapParents[2]].nodes[mapParents[3]].selected).toEqual(false);
        expect(componentSelectedNode.$parent.node[componentOption.NodeSelectedMark]).toEqual(false);
    });

    it('should keep parent selected when unselecting a sibling child', function () {
        var nodes = picker[0].getElementsByClassName('tree-handle-wrapper');
        nodes[8].click();
        nodes[9].click();
        nodes[9].click();

        var componentSelectedNode = picker.find('div').scope().vm.node;
        var mapParents = mapParentIndex(componentSelectedNode);

        expect(data.nodes[mapParents[0]].semiSelected).toEqual(true);
        expect(data.nodes[mapParents[0]].nodes[mapParents[1]].selected).toEqual(true);
        expect(data.nodes[mapParents[0]].nodes[mapParents[1]].nodes[mapParents[2]].selected).toEqual(true);
        expect(data.nodes[mapParents[0]].nodes[1].selected).toEqual(false);
        expect(data.nodes[mapParents[0]].nodes[1].nodes[0].selected).toEqual(false);
    });

    it('should not select siblings', function () {
        var nodes = picker[0].getElementsByClassName('tree-handle-wrapper');
        nodes[3].click();

        var componentSelectedNode = picker.find('div').scope().vm.node;
        var mapParents = mapParentIndex(componentSelectedNode);

        expect(data.nodes[mapParents[0]].semiSelected).toEqual(true);
        expect(data.nodes[mapParents[0]].nodes[mapParents[1]].semiSelected).toEqual(true);
        expect(data.nodes[mapParents[0]].nodes[mapParents[1]].nodes[mapParents[2]].semiSelected).toEqual(true);
        expect(data.nodes[mapParents[0]].nodes[mapParents[1]].nodes[mapParents[2]].nodes[mapParents[3]].selected).toEqual(true);
        expect(data.nodes[mapParents[0]].nodes[mapParents[1]].nodes[mapParents[2]].nodes[1].selected).toEqual(false);
        expect(data.nodes[mapParents[0]].nodes[mapParents[1]].nodes[mapParents[2]].nodes[1].nodes[0].selected).toEqual(false);
    });
});

describe('TreeDataTwoController', function () {
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
            RootSelectUnique: 'true'};

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

    function mapParentIndex(item, indexList) {
        if (angular.isUndefined(item)) {
            return;
        }
        if (indexList == null) {
            var indexList = [];
        }
        if (angular.isDefined(item.$parent.$index)) {
            indexList.splice(0, 0, item.$parent.$index);
            mapParentIndex(item.$parent.$parent, indexList)
        }
        return indexList;
    }

    it('should unselect other root when selecting children of other root', function () {
        var nodes = picker[0].getElementsByClassName('tree-handle-wrapper');
        nodes[15].click();
        nodes[4].click();

        var componentSelectedNode = picker.find('div').scope().vm.node;
        var mapParents = mapParentIndex(componentSelectedNode);

        expect(data.nodes[mapParents[0]].semiSelected).toEqual(true);
        expect(data.nodes[mapParents[0] + 1].semiSelected).toEqual(false);
    });
});

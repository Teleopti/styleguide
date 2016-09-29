describe('wfm-multiple-search-input directive', function() {
    var element, scope, vm;
    beforeEach(function () {
        module('pascalprecht.translate');
        module('styleguide.templates');
        module('wfm.multiplesearchinput');
    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        scope = _$rootScope_.$new();
        var elementCompile = _$compile_('<wfm-multiple-search-input title="\'Filter people\'" search-options="searchOptions" search-callback="searchKeyword"></wfm-multiple-search-input>');
        element = elementCompile(scope);
        scope.searchOptions = {
        keyword: '',
        searchKeywordChanged: false,
        searchFields: [
        'FirstName', 'LastName', 'EmploymentNumber', 'Organization', 'Role', 'Contract', 'ContractSchedule', 'ShiftBag',
        'PartTimePercentage', 'Skill', 'BudgetGroup', 'Note'
        ]
    };
        scope.$apply();
        vm = scope.$$childTail.vm;
        if (vm.searchOptions === undefined) {
            vm.searchOptions = {};
        }
    }));

    it('should display search fields', function() {
        vm.showAdvancedSearchOption = true;
        scope.$apply();
        var inputs = element.find('form').find('input');
        expect(inputs.length).toBe(scope.searchOptions.searchFields.length);

        var allFieldsExist = true;
        angular.forEach(inputs, function (input) {
            var fieldName = angular.element(input).attr('placeholder');
            allFieldsExist = allFieldsExist && scope.searchOptions.searchFields.indexOf(fieldName) > -1;
        });
        expect(allFieldsExist).toBe(true);
    });

    it('shoulde invoke search callback', function () {
        var searchExpression;
        scope.searchOptions.keyword = 'FirstName:Ash;LastName:Bcd';
        scope.searchKeyword = function (expression) {
        searchExpression = expression;
    };
        scope.$apply();

        vm.validateSearchKeywordChanged();
        vm.advancedSearchForm['FirstName'] = 'Ash22';
        vm.advancedSearch();

        expect(vm.showAdvancedSearchOption).toBe(false);
        expect(vm.searchOptions.searchKeywordChanged).toBe(true);
        expect(scope.searchOptions.keyword).toBe(searchExpression);
        expect(scope.searchOptions.keyword).toBe('firstName: Ash22; lastName: Bcd;');
    });

    it('should parse terms correctly by search with option', inject(function () {
        vm.advancedSearchForm = {
        FirstName: 'Ashley Smith',
        Organization: 'London Shenzhen'
    };

        vm.advancedSearch();

        expect(vm.searchOptions.keyword).toEqual('firstName: Ashley Smith; organization: London Shenzhen;');
    }));

    it('should handle both single quote and double quote in search value correctly', inject(function () {
        vm.searchOptions.keyword = 'role: "London, Site Admin" \'Team Leader\' Agent; contract:\'Full Time"';

        vm.validateSearchKeywordChanged();

        expect(vm.advancedSearchForm.Role).toEqual('"London, Site Admin" "Team Leader" Agent');
        expect(vm.advancedSearchForm.Contract).toEqual('"Full Time"');
    }));

    it('should handle comma in search value correctly', inject(function () {
        vm.searchOptions.keyword = 'role: "London, Site Admin" Agent; contract:"Full Time"';

        vm.validateSearchKeywordChanged();

        expect(vm.advancedSearchForm.Role).toEqual('"London, Site Admin" Agent');
        expect(vm.advancedSearchForm.Contract).toEqual('"Full Time"');
    }));

    it('should change the advanced search field according to simple search input', inject(function () {
        vm.searchOptions.keyword = 'FirstName: Ashley Smith; Organization: London Shenzhen';

        vm.validateSearchKeywordChanged();

        expect(vm.advancedSearchForm.FirstName).toEqual('Ashley Smith');
        expect(vm.advancedSearchForm.Organization).toEqual('London Shenzhen');

        vm.searchOptions.keyword = 'FirstName: John King';
        vm.validateSearchKeywordChanged();

        expect(vm.advancedSearchForm.FirstName).toEqual('John King');
        expect(vm.advancedSearchForm.Organization).toEqual(undefined);
    }));
});

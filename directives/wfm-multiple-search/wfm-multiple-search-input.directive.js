(function () {

'use strict';

var searchExpressionSeprator = ';';
var keyValueSeprator = ':';

	var multipleSearchInputCtrl = function () {
    var vm = this;
    vm.advancedSearchForm = {};

    vm.validateSearchKeywordChanged = function () {
        vm.searchOptions.searchKeywordChanged = true;
        parseSearchExpressionInputted();
    };
    vm.turnOffAdvancedSearch = function () {
        vm.showAdvancedSearchOption = false;
    };

    vm.toggleAdvancedSearchOption = function ($event) {
        vm.showAdvancedSearchOption = !vm.showAdvancedSearchOption;
        $event.stopPropagation();
        parseSearchExpressionInputted();
    };
    vm.advancedSearch = function () {
        vm.showAdvancedSearchOption = false;

        var expression = '';
        angular.forEach(vm.searchOptions.searchFields, function (searchType) {
            var title = searchType;
            expression += getSearchCriteria(title, vm.advancedSearchForm[searchType]);
        });

        expression = expression.trim();
        if (expression !== '' && expression !== vm.searchOptions.keyword) {
            vm.searchOptions.searchKeywordChanged = true;
        }
        vm.searchOptions.keyword = expression;
        if (vm.searchCallback) {
            vm.searchCallback(expression);
        }
    };

    function setSearchFormProperty(searchType, searchValue) {
        angular.forEach(vm.searchOptions.searchFields, function (propName) {
            if (propName.toUpperCase() === searchType.toUpperCase()) {
                vm.advancedSearchForm[propName] = searchValue;
            }
        });
    }

    function parseSearchValue(value) {
        if (value === undefined || value === null || value.trim().length === 0) {
            return '';
        }
        var displayValue = value.trim();

        var quotedKeywords = '';
        var pattern = /['"](.*?)['"]/ig;
        var match;
        while ((match = pattern.exec(displayValue))) {
            var keyword = match[1].trim();
            if (keyword.length > 0) {
                quotedKeywords = quotedKeywords + ' "' + keyword + '"';
            }
        }
        quotedKeywords = quotedKeywords.trim();

        var unquotedKeywords = displayValue
				.replace(pattern, '').trim()
				.replace('"', '').trim();

        return (quotedKeywords + ' ' + unquotedKeywords).trim();
    }

    function parseSearchExpressionInputted() {
        vm.advancedSearchForm = {};
        if (vm.searchOptions.keyword.indexOf(keyValueSeprator) !== -1) {
            var expression = vm.searchOptions.keyword.trim();
            if (expression.charAt(expression.length - 1) !== searchExpressionSeprator) {
                expression = expression + searchExpressionSeprator;
            }
            var regex = /(\S*?):\s{0,}(.*?);/ig;
            var match;
            while ((match = regex.exec(expression))) {
                var searchType = match[1].trim();
                var searchValue = parseSearchValue(match[2].trim());
                setSearchFormProperty(searchType, searchValue);
            }
        }
    }

    function getSearchCriteria(title, value) {
        var keyWords = parseSearchValue(value);
        return keyWords.length > 0 ? title + keyValueSeprator + ' ' + keyWords + searchExpressionSeprator + ' ' : '';
    }
};

	var multipleSearchInputDirective = function () {
    return {
        controller: 'multipleSearchInputCtrl',
        controllerAs: 'vm',
        bindToController: true,
        templateUrl: 'directives/wfm-multiple-search/wfm-multiple-search-input.tpl.html',
        scope: {
            title: '=',
            searchOptions: '=?',
            searchCallback: '=?'
        }
    };
};

	var outsideClickDirective = function ($window, $parse) {
    return {
        restrict: 'A',
        link: linkFunction
    };

    function linkFunction(scope, element, attrs) {
        var outsideClickHandler = $parse(attrs.outsideClick);
        var clickEventHandler = function (event) {
            if (element[0].contains(event.target)) {return;}
            outsideClickHandler(scope, {$event: event});
            scope.$apply();
        };
        angular.element($window).on('click', clickEventHandler);

        var cleanUp = function () {
            window.angular.element($window).off('click', clickEventHandler);
        };
        scope.$on('$destroy', cleanUp);
    }
	};

var keywordFormatDirective = function ($filter) {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: linkFunction
    };

    function linkFunction(scope, element, attrs, ctrl) {
        if (!ctrl) {return;}
        ctrl.$formatters.unshift(function () {
            var modelValue = ctrl.$modelValue;
            var formattedValues = [];
            var expressions = modelValue.split(searchExpressionSeprator);
            angular.forEach(expressions, function(expression) {
                var items = expression.split(keyValueSeprator);
                var key = items[0];
                var value = items[1];
                if (value) {
                    var displayKey = $filter('translate')(key);
                    formattedValues.push(displayKey + keyValueSeprator + value);
                }
            });
            if (formattedValues.length > 0) {
                return formattedValues.join(searchExpressionSeprator);
            }
            return modelValue;
        });
    }
};

	angular.module('wfm.multiplesearchinput', [])
		.directive('wfmMultipleSearchInput', multipleSearchInputDirective)
		.directive('outsideClick', ['$document', '$parse', outsideClickDirective])
		.directive('keywordFormat', ['$filter', keywordFormatDirective])
		.controller('multipleSearchInputCtrl', multipleSearchInputCtrl);

})();

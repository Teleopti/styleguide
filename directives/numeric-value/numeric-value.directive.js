(function() {
    'use strict';

    angular.module('wfm.numericValue',[]).directive('numericValue', numericValueDirective);

    function numericValueDirective() {

        return {
            restrict: 'A',
            require: ['ngModel', 'numericValue'],
            controller: ['$locale', numericValueCtrl],
            scope: {
                min: '@?',
                max: '@?'
            },
            link: postlink
        };

        function numericValueCtrl($locale) {
            /* jshint validthis: true */
            var ctrl = this;
            ctrl.parseNumberString = function(s, integerOnly) {
                var gSize = $locale.NUMBER_FORMATS.PATTERNS[0].gSize;
                var pieces = ('' + s).split($locale.NUMBER_FORMATS.DECIMAL_SEP),
                    whole = pieces[0],
                    fraction = pieces[1] || '';

                if (pieces.length > 2) {
                    return false;
                }

                if (integerOnly && fraction.length > 0) {
                    return false;
                }

                var _whole = whole.replace(/\s+/g, '').split($locale.NUMBER_FORMATS.GROUP_SEP).join(' ');

                var testWhole = new RegExp('^[-+]?[0-9]{1,' + gSize + '}( ?[0-9]{' + gSize + '})*$');
                if (!testWhole.test(_whole)) {
                    return false;
                }

                if (fraction.length > 0) {
                    if (!/^[0-9]+$/.test(fraction)) {
                        return false;
                    }
                }
                return integerOnly ? parseInt(_whole.replace(/\s+/g, '')) : parseFloat(_whole.replace(/\s+/g, '') + '.' + fraction);
            };
        }

        function postlink(scope, elem, attrs, ctrls) {
            var ngModel = ctrls[0],
                numericValue = ctrls[1];

            var acceptFloat = angular.isDefined(attrs.floatNumber);

            ngModel.$validators.number = validateByNumberParsing;
            ngModel.$validators.range = validateByNumberRange;

            ngModel.$parsers.push(function(viewValue) {
                return numericValue.parseNumberString(viewValue.trim(), !acceptFloat);
            });

            scope.$on('numeric-value.reset', reset);

            function validateByNumberParsing(modelValue, viewValue) {
                if (viewValue == null) {
                    return false;
                }
                var result = numericValue.parseNumberString(viewValue.trim(), !acceptFloat);
                if (result === false) {
                    return false;
                }
                return true;
            }

            function validateByNumberRange(modelValue, viewValue) {
                if (modelValue === null) {
                    return true;
                }
                if (angular.isDefined(scope.min)) {
                    var min = parseInt(scope.min);
                    if (modelValue < min) {
                        return false;
                    }
                }

                if (angular.isDefined(scope.max)) {
                    var max = parseInt(scope.max);
                    if (modelValue > max) {
                        return false;
                    }
                }
                return true;
            }

            function reset() {
                ngModel.$setViewValue(ngModel.$modelValue);
                ngModel.$render();
                ngModel.$setPristine();
            }

        }
    }

})();

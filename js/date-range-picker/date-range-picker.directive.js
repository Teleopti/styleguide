(function() {

    'use strict';

    angular.module('wfm.daterangepicker', ['styleguide.templates', 'angularMoment']).directive('dateRangePicker', ['$filter', dateRangePicker]);

    
    function dateRangePicker($filter) {
        return {           
            templateUrl: 'js/date-range-picker/date-range-picker.tpl.html',
            scope: {},
            controller: ['$element', dateRangePickerCtrl],
            require: ['ngModel', 'dateRangePicker'],
            link: postlink
        };

        function dateRangePickerCtrl($element) {

            var ctrl = this;
            $element.addClass('wfm-date-range-picker-wrap');

            ctrl.makeRangeClassSetter = makeRangeClassSetter;
           


            function makeRangeClassSetter(startDate, endDate) {
                if (!startDate || !endDate || moment(startDate).isAfter(endDate, 'day'))
                  return function() { return '';};
                
                return function setRangeClass(date, mode) {                   
                    if (mode === 'day') {                                 
                        if (! moment(date).isBefore(startDate, 'day') && ! moment(date).isAfter(endDate, 'day'))
                          return 'in-date-range';
                    }
                    return '';
                };
            }
          
        }

        function postlink(scope, elem, attrs, ctrls) {
            var ngModelCtrl = ctrls[0],
                dateRangeCtrl = ctrls[1];


            ngModelCtrl.$validators.empty = validateByValidDates;
            ngModelCtrl.$validators.order = validateByValidOrder;

            scope.$watchCollection(function() {
                if (!scope.startDate || !scope.endDate) return [null, null];
                return [
                  $filter('date')(scope.startDate, 'yyyy-MM-dd'),
                  $filter('date')(scope.endDate, 'yyyy-MM-dd')
                ];
            }, function(nvalue) {
                updateViewModelFromUi();                         
                scope.setRangeClass = dateRangeCtrl.makeRangeClassSetter.apply(null, nvalue);
                refreshDatepickers();
            });
            

            function validateByValidDates(modelValue, viewValue) {
                if (modelValue && angular.isDate(modelValue.startDate) && angular.isDate(modelValue.endDate)) {
                    return true;
                }
                return false;
            }

            function validateByValidOrder(modelValue, viewValue) {
                if (validateByValidDates(modelValue, viewValue)) 
                  return modelValue.startDate <= modelValue.endDate;
                return true;
            }

            function render() {
                scope.startDate = ngModelCtrl.$viewValue.startDate;
                scope.endDate = ngModelCtrl.$viewValue.endDate;
            }

            function updateViewModelFromUi() {
                ngModelCtrl.$setViewValue({
                    startDate: scope.startDate,
                    endDate: scope.endDate
                });                
            }

            
            function refreshDatepickers() {
                scope.startDate = angular.copy(scope.startDate);
                scope.endDate = angular.copy(scope.endDate);
            }

           
                     
        }
    }

})();

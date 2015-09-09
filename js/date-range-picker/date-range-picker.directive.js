(function () {

    'use strict';

    angular.module('wfm.daterangepicker', []).directive('dateRangePicker', ['$filter', dateRangePicker]);

    function dateRangePicker($filter) {
        return {
            template: getHtmlTemplate(),
            scope: {
                startDate: '=',
                endDate: '=',
                disabled: '=?',
                errors: '=?'
            },
            controller: ['$scope', '$element', dateRangePickerCtrl],
            require: ["dateRangePicker"],
            link: postlink
        }

        function dateRangePickerCtrl($scope, $element) {

            $element.addClass('wfm-date-range-picker-wrap');
            $scope.setRangeClass = setRangeClass;
            $scope.isInvalid = isInvalid;
        
            if (!angular.isDefined($scope.errors)) $scope.errors = [];

            this.refreshDatepickers = refreshDatepickers;
            this.checkValidity = checkValidity;
            
            function setRangeClass(date, mode) {
	        if (mode === 'day') {
		    var startDate = $scope.startDate,
		        endDate = $scope.endDate;
                    
		    if (startDate && endDate && startDate <= endDate) {
		        var dayToCheck = new Date(date).setHours(12, 0, 0, 0);
		        var start = new Date(startDate).setHours(12, 0, 0, 0);
		        var end = new Date(endDate).setHours(12, 0, 0, 0);
                        
		        if (dayToCheck >= start && dayToCheck <= end) {
			    return 'in-date-range';
		        }
		    }
	        }
	        return '';
	    }

            function isInvalid(symbol) {
                if (symbol) {
                    return $scope.errors.indexOf(symbol) >= 0;
                } else {
                    return $scope.errors.length > 0;
                }                
            }

            function checkValidity() {
                var errors = [];
		if (!$scope.startDate || !$scope.endDate) {
		    errors.push('empty');
		} else if ($scope.startDate > $scope.endDate) {
		    errors.push('order');
		}

                if (errors.length != $scope.errors.length || !(function compareArray(a1, a2 ){
                    for (var i = 0; i < a1.length; i++) {
                        if (a1[i] !== a2[i]) return false;
                    }
                    return true;
                } )(errors, $scope.errors)) {
                    $scope.errors = errors;
                }
                
            }

            function refreshDatepickers(startDate, endDate) {
		$scope.startDate = angular.copy($scope.startDate);
		$scope.endDate = angular.copy($scope.endDate);
	    }                        
        }
        
        function postlink(scope, elem, attrs, ctrls) {
            var ctrl = ctrls[0];            
            scope.$watch(function () {
		return {
		    startDate: scope.startDate ? $filter('date')(scope.startDate, 'yyyy-mm-dd'): '',
		    endDate: scope.endDate ? $filter('date')(scope.endDate, 'yyyy-mm-dd'): ''
		}
	    }, function (newValue) {

                ctrl.checkValidity();
                ctrl.refreshDatepickers();
	    }, true);

            scope.showMessage = !angular.isDefined(attrs.hideMessage); 
        }
    }

    function getHtmlTemplate() {

        return "<div class=\"wfm-block clearfix\" ng-class=\"{ 'ng-valid': !isInvalid(), 'ng-invalid': isInvalid(), 'ng-invalid-order': isInvalid('order'), 'ng-invalid-empty': isInvalid('empty')}\">" +
          "    <div class=\"wfm-datepicker-wrap no-boxshadow\">" +
          "      <div class=\"sub-header\">" +
          "	<span translate>From</span> <strong>{{ startDate | amDateFormat: \"LL\" }}</strong>" +
          "	<div class=\"icon-set form-validation-sign datepickerfix\">" +
          "	  <i class=\"mdi mdi-check success right-sign \"></i>" +
          "	  <i class=\"mdi mdi-close danger wrong-sign\"></i>" +
          "	</div>" +
          "      </div>" +
          "      <datepicker name=\"startDatePicker\" show-weeks=\"true\" class=\"wfm-datepicker datepicker-start-date\" ng-model=\"startDate\" ng-disabled=\"disabled\" custom-class=\"setRangeClass(date, mode)\"></datepicker>" +
          "    </div>" +
          "    <div class=\"wfm-datepicker-wrap no-boxshadow\">" +
          "      <div class=\"sub-header\">" +
          "	<span translate>To</span> <strong>{{ endDate | amDateFormat: \"LL\" }}</strong>" +
          "	<div class=\"icon-set form-validation-sign datepickerfix\">" +
          "	  <i class=\"mdi mdi-check success right-sign \"></i>" +
          "	  <i class=\"mdi mdi-close danger wrong-sign\"></i>" +
          "	</div>" +
          "      </div>" +
          "      <datepicker show-weeks=\"true\" class=\"wfm-datepicker datepicker-end-date\" ng-model=\"endDate\" ng-disabled=\"disabled\" custom-class=\"setRangeClass(date, mode)\"></datepicker>" +
          "    </div>" +
          "  </div>" +
          "<div class=\"error-msg-container ng-invalid-order alert-error notice-spacer\" ng-if=\"showMessage\"><i class='mdi mdi-alert-octagon'></i> <span translate>StartDateMustBeEqualToOrEarlierThanEndDate</span></div>" +
          "<div class=\"error-msg-container ng-invalid-empty alert-error notice-spacer\" ng-if=\"showMessage\"><i class='mdi mdi-alert-octagon'></i> <span translate>StartDateAndEndDateMustBeSet</span></div>" ;

    }

})();
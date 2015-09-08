(function () {

    'use strict';

    angular.module('wfm.daterangepicker', []).directive('dateRangePicker', dateRangePicker);

    function dateRangePicker() {

	var startDateSymbol,
	    endDateSymbol,
	    customClassSymbol,
	    disableSymbol,
	    errorsSymbol,
	    errorClassSymbol,
	    validityCheckSymbol,
	    hideMessageSymbol;

	return {
	    template: getHtmlTemplate(),
	    controller: ['$scope', '$attrs', dateRangePickerCtrl],
	    compile: compileFn
	};

	function compileFn(tElement, tAttributes) {

	    startDateSymbol = tAttributes.startDate;
	    endDateSymbol = tAttributes.endDate;
	    customClassSymbol = '$$setRangeClass';
	    disableSymbol = tAttributes.ngDisabled;
	    errorsSymbol = tAttributes.errors;
	    errorClassSymbol = '$$dateRangePickerErrorClass';
	    validityCheckSymbol = '$$dateRangePickerValid';
	    hideMessageSymbol = '$$dateRangePickerHideMessage';

	    tElement.addClass('wfm-date-range-picker-wrap');

	    var datepickerElements = tElement.find('datepicker');
	    datepickerElements.attr('custom-class', customClassSymbol + '(date, mode)');

	    if (disableSymbol) {
		datepickerElements.attr('ng-disabled', disableSymbol);
	    }
	    angular.forEach(datepickerElements, function (ce) {
		var $ce = angular.element(ce);
		if ($ce.hasClass('datepicker-start-date'))
		  $ce.attr('ng-model', startDateSymbol);
		if ($ce.hasClass('datepicker-end-date'))
		  $ce.attr('ng-model', endDateSymbol);
	    });

	    var labelElements = tElement.find('strong');

	    angular.forEach(labelElements, function (ce) {
		var $ce = angular.element(ce);

		if ($ce.hasClass('datepicker-start-date'))
		  $ce.text('{{' + startDateSymbol + ' | amDateFormat: "LL" }}');
		if ($ce.hasClass('datepicker-end-date'))
		  $ce.text('{{' + endDateSymbol + ' | amDateFormat: "LL" }}');
	    });

	    var childrenElements = tElement.children('div');
	    angular.forEach(childrenElements, function (ce) {
		var $ce = angular.element(ce);
		if ($ce.hasClass('date-range-pickers')) {
		    $ce.attr('ng-class', '{ ' +
			     '"ng-valid" : !' + validityCheckSymbol + '() ' +
			     ', "ng-invalid" : ' + validityCheckSymbol + '() ' +
			     ', "ng-invalid-order" : ' + errorClassSymbol + '("order") ' +
			     ', "ng-invalid-empty" : ' + errorClassSymbol + '("empty") ' +
			     '} ');
		} else if ($ce.hasClass('date-range-picker-message')) {
		    $ce.attr('ng-if', '!' + hideMessageSymbol);
		}
	    });

	    return function link(scope, elem, attrs) {

		scope.$watch(function () {
		    var startDate = readSymbolValue(scope, startDateSymbol),
			endDate = readSymbolValue(scope, endDateSymbol);
		    return {
			startDate: startDate ? moment(startDate).format('LL') : '',
			endDate: endDate ? moment(endDate).format('LL') : ''
		    }
		}, function () {
		    var startDate = readSymbolValue(scope, startDateSymbol),
			endDate = readSymbolValue(scope, endDateSymbol);
		    validityCheck(startDate, endDate);
		    refreshDatepickers(startDate, endDate);
		}, true);

		function refreshDatepickers(startDate, endDate) {
		    setSymbolValue(scope, startDateSymbol, angular.copy(startDate));
		    setSymbolValue(scope, endDateSymbol, angular.copy(endDate));
		}

		function validityCheck(startDate, endDate) {
		    var errors = [];
		    if (!startDate || !endDate) {
			errors.push('empty');
		    } else if (startDate > endDate) {
			errors.push('order');
		    }
		    setSymbolValue(scope, errorsSymbol, errors);
		}
	    };
	}

	function dateRangePickerCtrl($scope, $attrs) {
	    $scope[customClassSymbol] = function setRangeClass(date, mode) {
		if (mode === 'day') {
		    var startDate = readSymbolValue($scope, startDateSymbol),
			endDate = readSymbolValue($scope, endDateSymbol);

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
	    };

	    $scope[validityCheckSymbol] = function () {
		var errors = readSymbolValue($scope, errorsSymbol);
		return errors && errors.length > 0;
	    };

	    $scope[errorClassSymbol] = function (e) {
		var errors = readSymbolValue($scope, errorsSymbol);
		return errors && errors.indexOf(e) >= 0;
	    }

	    $scope[hideMessageSymbol] = angular.isDefined($attrs.hideMessage);

	}

	function readSymbolValue(obj, symbol) {
	    var pieces = symbol.split('.'),
		curObj = obj;

	    for (var i = 0; i < pieces.length; i++) {
		if (angular.isDefined(curObj[pieces[i]])) {
		    curObj = curObj[pieces[i]];
		} else {
		    return undefined;
		}
	    }

	    return curObj;
	}

	function setSymbolValue(obj, symbol, value) {
	    var pieces = symbol.split('.'),
		curObj = obj;

	    for (var i = 0; i < pieces.length - 1; i++) {
		if (angular.isDefined(curObj[pieces[i]])) {
		    curObj = curObj[pieces[i]];
		} else {
		    return undefined;
		}
	    }

	    curObj[pieces[pieces.length - 1]] = value;
	    return value;
	}

    }

    function getHtmlTemplate() {

        return "<div class=\"wfm-block clearfix date-range-pickers\">" +
          "    <div class=\"wfm-datepicker-wrap no-boxshadow\">" +
          "      <div class=\"sub-header\">" +
          "	<span translate>From</span> <strong class=\"datepicker-start-date\"></strong>" +
          "	<div class=\"icon-set  form-validation-sign datepickerfix\">" +
          "	  <i class=\"mdi mdi-check success right-sign \"></i>" +
          "	  <i class=\"mdi mdi-close danger wrong-sign\"></i>" +
          "	</div>" +
          "      </div>" +
          "      <datepicker show-weeks=\"true\" class=\"wfm-datepicker datepicker-start-date\"></datepicker>" +
          "    </div>" +
          "    <div class=\"wfm-datepicker-wrap no-boxshadow\">" +
          "      <div class=\"sub-header\">" +
          "	<span translate>To</span> <strong class=\"datepicker-end-date\"></strong>" +
          "	<div class=\"icon-set  form-validation-sign datepickerfix\">" +
          "	  <i class=\"mdi mdi-check success right-sign \"></i>" +
          "	  <i class=\"mdi mdi-close danger wrong-sign\"></i>" +
          "	</div>" +
          "      </div>" +
          "      <datepicker show-weeks=\"true\" class=\"wfm-datepicker datepicker-end-date\"></datepicker>" +
          "    </div>" +
          "  </div>" +
          "<div class=\"error-msg-container ng-invalid-order alert-error notice-spacer date-range-picker-message\"><i class='mdi mdi-alert-octagon'></i> <span translate>StartDateMustBeEqualToOrEarlierThanEndDate</span></div>" +
          "<div class=\"error-msg-container ng-invalid-empty alert-error notice-spacer date-range-picker-message\"><i class='mdi mdi-alert-octagon'></i> <span translate>StartDateAndEndDateMustBeSet</span></div>" ;

    }

})();
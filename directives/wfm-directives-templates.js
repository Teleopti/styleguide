angular.module('wfm.directives.templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directives/date-range-picker/wfm-date-range-picker.tpl.html',
    "<div ng-show=\"templateType==='inline'\" class=\"wfm-block clearfix picker-template-inline\">\r" +
    "\n" +
    "	<div ng-class=\"{ 'ng-valid': !isInvalid(), 'ng-invalid': isInvalid(), 'ng-invalid-order': isInvalid('order'), 'ng-invalid-empty': isInvalid('empty')}\">\r" +
    "\n" +
    "		<div class=\"wfm-datepicker-wrap no-boxshadow\">\r" +
    "\n" +
    "			<div class=\"sub-header\">\r" +
    "\n" +
    "				<span translate>From</span> <strong>{{ startDate | date: \"shortDate\" }}</strong>\r" +
    "\n" +
    "				<div class=\"icon-set form-validation-sign datepickerfix\">\r" +
    "\n" +
    "					<i class=\"mdi mdi-check right-sign \"></i>\r" +
    "\n" +
    "					<i class=\"mdi mdi-close wrong-sign\"></i>\r" +
    "\n" +
    "				</div>\r" +
    "\n" +
    "			</div>\r" +
    "\n" +
    "			<datepicker name=\"startDatePicker\" show-weeks=\"true\" class=\"wfm-datepicker datepicker-start-date\" ng-model=\"startDate\" ng-disabled=\"disabled\"\r" +
    "\n" +
    "						custom-class=\"setRangeClass(date, mode)\"></datepicker>\r" +
    "\n" +
    "		</div>\r" +
    "\n" +
    "		<div class=\"wfm-datepicker-wrap no-boxshadow\">\r" +
    "\n" +
    "			<div class=\"sub-header\">\r" +
    "\n" +
    "				<span translate>To</span> <strong>{{ endDate | date: \"shortDate\" }}</strong>\r" +
    "\n" +
    "				<div class=\"icon-set form-validation-sign datepickerfix\">\r" +
    "\n" +
    "					<i class=\"mdi mdi-check right-sign\"></i>\r" +
    "\n" +
    "					<i class=\"mdi mdi-close wrong-sign\"></i>\r" +
    "\n" +
    "				</div>\r" +
    "\n" +
    "			</div>\r" +
    "\n" +
    "			<datepicker show-weeks=\"true\" class=\"wfm-datepicker datepicker-end-date\" ng-model=\"endDate\" ng-disabled=\"disabled\" custom-class=\"setRangeClass(date, mode)\"></datepicker>\r" +
    "\n" +
    "		</div>\r" +
    "\n" +
    "		<div class=\"error-msg-container ng-invalid-order alert-error notice-spacer\" ng-if=\"showMessage\"><i class='mdi mdi-alert-octagon'></i> <span translate>StartDateMustBeEqualToOrEarlierThanEndDate</span></div>\r" +
    "\n" +
    "		<div class=\"error-msg-container ng-invalid-empty alert-error notice-spacer\" ng-if=\"showMessage\"><i class='mdi mdi-alert-octagon'></i> <span translate>StartDateAndEndDateMustBeSet</span></div>\r" +
    "\n" +
    "	</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div ng-show=\"templateType==='dropdown'\" class=\"inline-block picker-template-dropdown\" >\r" +
    "\n" +
    "	<div ng-class=\"{'ng-valid': !isInvalid(), 'ng-invalid': isInvalid(), 'ng-invalid-order': isInvalid('order'), 'ng-invalid-empty': isInvalid('empty')}\">\r" +
    "\n" +
    "		<span translate class=\"hor-m-5\">From</span>\r" +
    "\n" +
    "		<div class=\"inline-block relative\">\r" +
    "\n" +
    "			<input class=\"pointer start-date-input\"\r" +
    "\n" +
    "				   type=\"text\"\r" +
    "\n" +
    "				   ng-click=\"onClickStartDateInput()\"\r" +
    "\n" +
    "				   ng-model=\"startDate\"\r" +
    "\n" +
    "				   uib-datepicker-popup=\"{{shortDate}}\"\r" +
    "\n" +
    "				   on-open-focus=\"false\"\r" +
    "\n" +
    "				   custom-class=\"setRangeClass(date, mode)\"\r" +
    "\n" +
    "				   show-weeks=\"true\"\r" +
    "\n" +
    "				   is-open=\"dropDownState.showStartDatePicker\"\r" +
    "\n" +
    "				   ng-required=\"true\"\r" +
    "\n" +
    "				   show-button-bar=\"false\"\r" +
    "\n" +
    "				   close-on-date-selection=\"false\" />\r" +
    "\n" +
    "		</div>\r" +
    "\n" +
    "		<span translate class=\"hor-m-5\">To</span>\r" +
    "\n" +
    "		<div class=\"inline-block relative\">\r" +
    "\n" +
    "			<input class=\"pointer end-date-input\"\r" +
    "\n" +
    "				   type=\"text\"\r" +
    "\n" +
    "				   ng-click=\"onClickEndDateInput()\"\r" +
    "\n" +
    "				   ng-model=\"endDate\"\r" +
    "\n" +
    "				   uib-datepicker-popup=\"{{shortDate}}\"\r" +
    "\n" +
    "				   on-open-focus=\"false\"\r" +
    "\n" +
    "				   show-weeks=\"true\"\r" +
    "\n" +
    "				   custom-class=\"setRangeClass(date, mode)\"\r" +
    "\n" +
    "				   is-open=\"dropDownState.showEndDatePicker\"\r" +
    "\n" +
    "				   ng-required=\"true\"\r" +
    "\n" +
    "				   show-button-bar=\"false\"\r" +
    "\n" +
    "				   close-on-date-selection=\"false\" />\r" +
    "\n" +
    "		</div>\r" +
    "\n" +
    "		<span class='pointer iconfix' ng-mouseenter=\"hoverShow=true\" ng-mouseleave=\"hoverShow=false\" ng-click=\"onClickShowAllDates()\"\r" +
    "\n" +
    "			  ng-class='{\"pin-down\" : dropDownState.showAllDatePickers}'><i class=\"mdi mdi-calendar middle\"></i></span>\r" +
    "\n" +
    "		<div class=\"error-msg-container invalid-order alert-error notice-spacer\" ng-if=\"hoverShow\"><i class='mdi mdi-alert-octagon'></i> <span translate>StartDateMustBeEqualToOrEarlierThanEndDate</span></div>\r" +
    "\n" +
    "		<div class=\"error-msg-container invalid-empty alert-error notice-spacer\" ng-if=\"hoverShow\"><i class='mdi mdi-alert-octagon'></i> <span translate>StartDateAndEndDateMustBeSet</span></div>\r" +
    "\n" +
    "	</div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );

}]);

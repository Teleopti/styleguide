angular.module('styleguide.templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('js/date-range-picker/date-range-picker.tpl.html',
    "<div ng-class=\"{ 'ng-valid': isValid(), 'ng-invalid': isInvalid(), 'ng-invalid-order': isInvalid('order'), 'ng-invalid-empty': isInvalid('empty')}\">\r" +
    "\n" +
    "  <div class=\"wfm-datepicker-wrap no-boxshadow\">\r" +
    "\n" +
    "    <div class=\"sub-header\">\r" +
    "\n" +
    "      <span translate>From</span> <strong>{{ startDate | date: \"shortDate\" }}</strong>\r" +
    "\n" +
    "      <div class=\"icon-set form-validation-sign datepickerfix\">\r" +
    "\n" +
    "\t<i class=\"mdi mdi-check right-sign \"></i>\r" +
    "\n" +
    "\t<i class=\"mdi mdi-close wrong-sign\"></i>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <datepicker name=\"startDatePicker\" show-weeks=\"true\" class=\"wfm-datepicker datepicker-start-date\" ng-model=\"startDate\" ng-disabled=\"disabled\"\r" +
    "\n" +
    "\t    custom-class=\"setRangeClass(date, mode)\"></datepicker>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t<div class=\"wfm-datepicker-wrap no-boxshadow\">\r" +
    "\n" +
    "\t\t  <div class=\"sub-header\">\r" +
    "\n" +
    "\t\t    <span translate>To</span> <strong>{{ endDate | date: \"shortDate\" }}</strong>\r" +
    "\n" +
    "\t\t    <div class=\"icon-set form-validation-sign datepickerfix\">\r" +
    "\n" +
    "\t\t      <i class=\"mdi mdi-check right-sign\"></i>\r" +
    "\n" +
    "\t\t      <i class=\"mdi mdi-close wrong-sign\"></i>\r" +
    "\n" +
    "\t\t    </div>\r" +
    "\n" +
    "\t\t  </div>\r" +
    "\n" +
    "\t\t  <datepicker show-weeks=\"true\" class=\"wfm-datepicker datepicker-end-date\" ng-model=\"endDate\" ng-disabled=\"disabled\" custom-class=\"setRangeClass(date, mode)\"></datepicker>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t<div class=\"error-msg-container ng-invalid-order alert-error notice-spacer\" ng-if=\"showMessage\"><i class='mdi mdi-alert-octagon'></i> <span translate>StartDateMustBeEqualToOrEarlierThanEndDate</span></div>\r" +
    "\n" +
    "\t\t<div class=\"error-msg-container ng-invalid-empty alert-error notice-spacer\" ng-if=\"showMessage\"><i class='mdi mdi-alert-octagon'></i> <span translate>StartDateAndEndDateMustBeSet</span></div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );

}]);

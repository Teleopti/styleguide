angular.module('styleguide.templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directives/date-range-picker/date-range-picker.tpl.html',
    "<div ng-show=\"!displayPopup()\">\r" +
    "\n" +
    "  <div class=\"wfm-datepicker-wrap\">\r" +
    "\n" +
    "    <div class=\"sub-header\">\r" +
    "\n" +
    "      <span>From</span>: <strong>{{ startDate | date: dateFormat }}</strong>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <span uib-datepicker ng-model=\"startDate\" show-weeks=\"true\" custom-class=\"setRangeClass(date, mode)\" class=\"wfm-datepicker\"></span>  \r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"wfm-datepicker-wrap\">\r" +
    "\n" +
    "    <div class=\"sub-header\">\r" +
    "\n" +
    "      <span>To</span>: <strong>{{ endDate | date: dateFormat }}</strong>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <span uib-datepicker ng-model=\"endDate\" show-weeks=\"true\" custom-class=\"setRangeClass(date, mode)\" class=\"wfm-datepicker\"></span>  \r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"error-msg-container ng-invalid-order alert-error notice-spacer\">\r" +
    "\n" +
    "    <i class='mdi mdi-alert-octagon'></i> <span>StartDateMustBeEqualToOrEarlierThanEndDate</span>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"error-msg-container ng-invalid-empty alert-error notice-spacer\">\r" +
    "\n" +
    "    <i class='mdi mdi-alert-octagon'></i> <span>StartDateAndEndDateMustBeSet</span>\r" +
    "\n" +
    "  </div>  \r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div ng-show=\"displayPopup()\">\r" +
    "\n" +
    "  <span translate class=\"hor-m-5\">From</span>\r" +
    "\n" +
    "  <div class=\"inline-datepicker-wrap\">\r" +
    "\n" +
    "    <input class=\"pointer start-date-input\"\r" +
    "\n" +
    "\t    type=\"text\"\r" +
    "\n" +
    "\t    ng-click=\"onClickStartDateInput()\"\r" +
    "\n" +
    "\t    ng-model=\"startDate\"\r" +
    "\n" +
    "\t    uib-datepicker-popup=\"{{dateFormat}}\"\r" +
    "\n" +
    "\t    on-open-focus=\"false\"\r" +
    "\n" +
    "\t    custom-class=\"setRangeClass(date, mode)\"\r" +
    "\n" +
    "\t    show-weeks=\"true\"\r" +
    "\n" +
    "\t    is-open=\"dropDownState.showStartDatePicker\"\r" +
    "\n" +
    "\t    ng-required=\"true\"\r" +
    "\n" +
    "\t    show-button-bar=\"false\" \r" +
    "\n" +
    "\t    close-on-date-selection=\"false\" />\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <span translate class=\"hor-m-5\">To</span>\r" +
    "\n" +
    "  <div class=\"inline-datepicker-wrap\">\r" +
    "\n" +
    "    <input class=\"pointer end-date-input\"\r" +
    "\n" +
    "\t    type=\"text\"\r" +
    "\n" +
    "\t    ng-click=\"onClickEndDateInput()\"\r" +
    "\n" +
    "\t    ng-model=\"endDate\"\r" +
    "\n" +
    "\t    uib-datepicker-popup=\"{{dateFormat}}\"\r" +
    "\n" +
    "\t    on-open-focus=\"false\"\r" +
    "\n" +
    "\t    show-weeks=\"true\"\r" +
    "\n" +
    "\t    custom-class=\"setRangeClass(date, mode)\"\r" +
    "\n" +
    "\t    is-open=\"dropDownState.showEndDatePicker\"\r" +
    "\n" +
    "\t    ng-required=\"true\"\r" +
    "\n" +
    "\t    show-button-bar=\"false\"\r" +
    "\n" +
    "\t    close-on-date-selection=\"false\" />\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <span class='popup-control'\r" +
    "\n" +
    "\t  ng-mouseenter=\"hoverShow=true\"\r" +
    "\n" +
    "\t  ng-mouseleave=\"hoverShow=false\"\r" +
    "\n" +
    "\t  ng-click=\"onClickShowAllDates()\"\r" +
    "\n" +
    "\t  ng-class='{\"pin-down\" : dropDownState.showAllDatePickers}'>\r" +
    "\n" +
    "    <i class=\"mdi mdi-calendar middle\"></i>\r" +
    "\n" +
    "  </span>\r" +
    "\n" +
    "  \r" +
    "\n" +
    "  <div class=\"error-msg-container error-msg-popup-container ng-invalid-order alert-error notice-spacer\">\r" +
    "\n" +
    "    <i class='mdi mdi-alert-octagon'></i> <span>StartDateMustBeEqualToOrEarlierThanEndDate</span>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"error-msg-container error-msg-popup-container ng-invalid-empty alert-error notice-spacer\" ng-if=\"hoverShow\">\r" +
    "\n" +
    "    <i class='mdi mdi-alert-octagon'></i> <span>StartDateAndEndDateMustBeSet</span>\r" +
    "\n" +
    "  </div>  \r" +
    "\n" +
    " \r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );

}]);

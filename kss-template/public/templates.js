angular.module('styleguide.templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('js/date-range-picker/date-range-picker.tpl.html',
    "<div class=\"wfm-datepicker-wrap\">\r" +
    "\n" +
    "  <span uib-datepicker ng-model=\"startDate\" show-weeks=\"true\" custom-class=\"setRangeClass(date, mode)\" class=\"wfm-datepicker\"></span>  \r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"wfm-datepicker-wrap\">\r" +
    "\n" +
    "  <span uib-datepicker ng-model=\"endDate\" show-weeks=\"true\" custom-class=\"setRangeClass(date, mode)\" class=\"wfm-datepicker\"></span>  \r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n"
  );

}]);

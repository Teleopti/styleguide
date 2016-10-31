(function() {
    'use strict';

    angular.module('ui.bootstrap.datepicker')
    	   .run(['$templateCache', function ($templateCache) {
    	       // Apply customized style to datepicker popup
    		$templateCache.put("uib/template/datepicker/popup.html",
    			           "<ul class=\"dropdown-menu\" ng-if=\"isOpen\" style=\"display: block\" ng-style=\"{top: position.top+'px', left: position.left+'px'}\" ng-keydown=\"keydown($event)\" ng-click=\"$event.stopPropagation()\">\n" +
    			           "	<li class=\"wfm-datepicker-wrap\" ng-transclude></li>\n" +
    			           "	<li ng-if=\"showButtonBar\" style=\"padding:10px 9px 2px\">\n" +
    			           "		<span class=\"btn-group pull-left\">\n" +
    			           "			<button type=\"button\" class=\"btn btn-sm btn-info\" ng-click=\"select('today')\">{{ getText('current') }}</button>\n" +
    			           "			<button type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"select(null)\">{{ getText('clear') }}</button>\n" +
    			           "		</span>\n" +
    			           "		<button type=\"button\" class=\"btn btn-sm btn-success pull-right\" ng-click=\"close()\">{{ getText('close') }}</button>\n" +
    			"	</li>\n" +
    			           "</ul>\n" +
    			           "");

    	       $templateCache.put("uib/template/datepicker/day.html",
    			          "<table role=\"grid\" class=\"wfm-datepicker\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    			          "  <thead>\n" +
    			          "    <tr>\n" +
    			          "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
    			          "      <th colspan=\"{{::5 + showWeeks}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    			          "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
    			          "    </tr>\n" +
    			          "    <tr>\n" +
    			          "      <th ng-if=\"showWeeks\" class=\"text-center\"></th>\n" +
    			          "      <th ng-repeat=\"label in ::labels track by $index\" class=\"text-center\"><small aria-label=\"{{::label.full}}\">{{::label.abbr}}</small></th>\n" +
    			          "    </tr>\n" +
    			          "  </thead>\n" +
    			          "  <tbody>\n" +
    			          "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    			          "      <td ng-if=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td>\n" +
    			          "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\" ng-class=\"dt.customClass\">\n" +  //remove the "::" to make the customClasshandler woks for date range change.
    			          "        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default btn-sm\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'text-muted': dt.secondary, 'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
    			          "      </td>\n" +
    			          "    </tr>\n" +
    			          "  </tbody>\n" +
    			          "</table>\n" +
    			          "");
    	   }]);

})();

(function() {
    'use strict';

    angular.module('ui.bootstrap.timepicker')
	   .run([
	     '$templateCache', function($templateCache) {
		 $templateCache.put("uib/template/timepicker/timepicker.html",				    
				    "<table>" +
				    "  <tbody>" +
				    "    <tr>" +
				    "      <td class=\"form-group\" ng-class=\"{'has-error': invalidHours}\">" +
				    "          <input type=\"text\" ng-model=\"hours\" ng-change=\"updateHours()\" ng-readonly=\"::readonlyInput\" maxlength=\"2\" tabindex=\"1\"/>" +
				    "	" +
				    "      </td>" +
				    "      <td>:</td>" +
				    "      <td class=\"form-group\" ng-class=\"{'has-error': invalidMinutes}\">" +
				    "          <input type=\"text\" ng-model=\"minutes\" ng-change=\"updateMinutes()\" ng-readonly=\"::readonlyInput\" maxlength=\"2\" tabindex=\"1\"/>" +
				    "      </td>" +
				    "      <td ng-show=\"showMeridian\">" +
				    "	<md-button ng-disabled=\"noToggleMeridian()\" ng-click=\"toggleMeridian()\" tabindex=\"1\">{{meridian}}</md-button>" +
				    "      </td>" +
				    "    </tr>" +
				    "  </tbody>" +
				    "</table>" 
				    
				   );

	     }
	   ]);

})();

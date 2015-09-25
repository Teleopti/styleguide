(function() {

    'use strict';

    angular.module('wfm.timerangepicker', [])
           .directive('timepickerWrap', [timepickerWrap])
           .directive('timeRangePicker', ['$filter', timeRangePicker]);
   

    function timeRangePicker($filter) {
        return {
            template: getHtmlTemplate(),
            scope: {
                startTime: '=',
                endTime: '=',
                errors: '=?',
                hideMessage: '=?'
            },
            controller: ['$scope', '$element', timeRangePickerCtrl],
            require: ['timeRangePicker'],
            link: postlink
        };

        function timeRangePickerCtrl($scope, $element) {
            
            $element.addClass('wfm-time-range-picker-wrap');

            var errors = [];

            if (angular.isDefined($scope.errors)) $scope.errors = errors;            

            if (!$scope.startTime) $scope.startTime = moment({ hour: 8}).toDate();
            if (!$scope.endTime) $scope.endTime = moment({hour: 17}).toDate();
            
            $scope.nextDay = isOnDifferentDays();
            $scope.isInvalid = isInvalid;
            
            this.setDateValue = setDateValue;
            this.checkValidity = checkValidity;
            
            function setDateValue(nextDay) {               
                if (!nextDay) {                 
                    var thisMomentDate = moment($scope.startTime);
                    var endTimeMoment = moment($scope.endTime);
                    thisMomentDate.set('hour', endTimeMoment.get('hour'))
                    .set('minute', endTimeMoment.get('minute'));                        
                    $scope.endTime = thisMomentDate.toDate();                    
                } else {                  
                    var nextMomentDate = moment($scope.startTime).add(1, 'day');
                    var endTimeMoment = moment($scope.endTime);
                    nextMomentDate.set('hour', endTimeMoment.get('hour'))
                    .set('minute', endTimeMoment.get('minute'));                    
                    $scope.endTime = nextMomentDate.toDate();                    
                }
            }

            function isOnDifferentDays() {
                return moment($scope.endTime).diff(moment($scope.startTime), 'days') > 0;
            }

            function isInvalid(symbol) {
                if (symbol) {
                    return errors.indexOf(symbol) >= 0;
                } else {
                    return errors.length > 0;
                }   
            }
            
            function checkValidity() {
                errors.splice(0, errors.length);
     
                if (!$scope.startTime || !$scope.endTime) {
		    errors.push('empty');
		} else if ($scope.startTime >= $scope.endTime) {
		    errors.push('order');
		}    
                if (angular.isDefined($scope.errors)) $scope.errors = errors;
            }
            
        }

        function postlink(scope, elem, attrs, ctrls) {
            var ctrl = ctrls[0];
                     
            scope.$watch('nextDay', function(newValue, oldValue) {
                ctrl.setDateValue(newValue);
            });

            scope.$watch(function() {
                return {
                    n: scope.nextDay,
                    s: scope.startTime?$filter('date')(scope.startTime, 'HH:mm'): '',
                    e: scope.endTime?$filter('date')(scope.endTime, 'HH:mm'): ''
                }
            }, function(newValue, oldValue) {                
                ctrl.checkValidity();                
            }, true);

            scope.showMessage = !angular.isDefined(attrs.hideMessage); 
        }
    }

    function timepickerWrap() {

        var meridianInfo = getMeridiemInfoFromMoment();

	return {
	    template: '<timepicker></timepicker>',
	    controller: ['$scope', timepickerWrapCtrl],
	    compile: compileFn
	};

	function compileFn(tElement, tAttributes) {
	    var binding = tAttributes.ngModel;
	    tElement.addClass('wfm-timepicker-wrap');

	    var cellElement = tElement.find('timepicker');
	    cellElement.attr('ng-model', binding);
	    cellElement.attr('show-meridian', 'showMeridian');
	    cellElement.attr('minute-step', 'minuteStep');

	    if (meridianInfo.showMeridian) {
		cellElement.attr('meridians', 'meridians');
	    }
	}

	function timepickerWrapCtrl($scope) {
	    $scope.showMeridian = meridianInfo.showMeridian;
	    $scope.minuteStep = 5;

	    if (meridianInfo.showMeridian) {
		$scope.meridians = [meridianInfo.am, meridianInfo.pm];
	    }
	}

    }
    
    function getHtmlTemplate() {
        return "<div ng-class=\"{'ng-valid': !isInvalid(), 'ng-invalid': isInvalid(), 'ng-invalid-order': isInvalid('order'), 'ng-invalid-empty': isInvalid('empty')}\">" +
          " <table> " +
          "   <tr> " +
          "     <td><timepicker-wrap ng-model=\"startTime\"></timepicker></td> " +
          "     <td> <i class=\"mdi mdi-minus\"> </i> </td> " +
          "     <td><timepicker-wrap ng-model=\"endTime\"></timepicker></td> " +
          "     <td> " +
          "       <div class=\"wfm-switch\"> " +
          " 	<input type=\"checkbox\" id=\"NextDaySwitch\" ng-model=\"nextDay\"/> " +
          " 	<label for=\"NextDaySwitch\"> " +
          " 	  <span class=\"wfm-switch-label\">Next Day</span> " +
          " 	  <span class=\"wfm-switch-toggle\"></span> " +
          " 	</label> " +
          "       </div>       " +
          "     </td> " +
          "   </tr> " +
          " </table> " +
          "</div>" +
          "<div class=\"error-msg-container ng-invalid-order alert-error notice-spacer\" ng-if=\"showMessage\"><i class='mdi mdi-alert-octagon'></i> <span translate>EndTimeMustBeGreaterOrEqualToStartTime</span></div> " +
	  "<div class=\"error-msg-container ng-invalid-empty alert-error notice-spacer\" ng-if=\"showMessage\"><i class='mdi mdi-alert-octagon'></i> <span translate>StartTimeAndEndTimeMustBeSet</span></div>";

    }


    function getMeridiemInfoFromMoment() {
	var timeFormat = moment.localeData()._longDateFormat.LT;
	var info = {};

	if (/h/.test(timeFormat)) {
	    info.showMeridian = true;
	    info.am = moment.localeData().meridiem(9, 0);
	    info.pm = moment.localeData().meridiem(15, 0);
	} else {
	    info.showMeridian = false;
	}

	return info;
    }


})();
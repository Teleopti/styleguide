(function() {

    'use strict';

    angular.module('wfm.timerangepicker', [])
           .directive('timepickerWrap', [timepickerWrap])
           .directive('timeRangePicker', ['$filter', timeRangePicker]);

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

    function timeRangePicker($filter) {
        return {
            template: getHtmlTemplate(),
            scope: {
                startTime: '=',
                endTime: '=',
                disabled: '=?',
                errors: '=?'
            },
            controller: ['$scope', '$element', timeRangePickerCtrl],
            require: ['timeRangePicker'],
            link: postlink
        };

        function timeRangePickerCtrl($scope, $element) {
            
            $element.addClass('wfm-time-range-picker-wrap');
           

            if (!$scope.startTime) $scope.startTime = moment({ hour: 8}).toDate();
            if (!$scope.endTime) $scope.endTime = moment({hour: 17}).toDate();
            
            $scope.nextDay = isOnDifferentDays();
            $scope.isInvalid = isInvalid;
            
            this.setDateValue = setDateValue;
            this.checkValidity = checkValidity;
            
            function setDateValue(nextDay) {               
                if (!nextDay) {
                    if ( isOnDifferentDays()) {
                        $scope.endTime.setFullYear($scope.startTime.getFullYear(),
                                                   $scope.startTime.getMonth(),
                                                   $scope.startTime.getDate());
                    }
                } else {
                    if (! isOnDifferentDays()) {
                        var nextMomentDate = moment($scope.startTime).add(1, 'day');
                        $scope.endTime.setFullYear(nextMomentDate.get('year'),
                                                   nextMomentDate.get('month'),
                                                   nextMomentDate.get('date'));
                    }
                }
            }

            function isOnDifferentDays() {
                return moment($scope.endTime).diff(moment($scope.startTime), 'days') > 0;
            }

            function isInvalid(symbol) {
                if (!$scope.errors) $scope.errors = [];                
                if (symbol) {
                    return $scope.errors.indexOf(symbol) >= 0;
                } else {
                    return $scope.errors.length > 0;
                }   
            }
            
            function checkValidity() {
                var errors = [];
                if (!$scope.errors) $scope.errors = [];                
     
                if (!$scope.startTime || !$scope.endTime) {
		    errors.push('empty');
		} else if ($scope.startTime >= $scope.endTime) {
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
            
        }

        function postlink(scope, elem, attrs, ctrls) {
            var ctrl = ctrls[0];
                     
            scope.$watch('nextDay', function(newValue, oldValue) {
                ctrl.setDateValue(newValue);
            });

            scope.$watch(function() {
                return {
                    d: moment(scope.startTime).diff(moment(scope.endTime), 'days'),
                    s: scope.startTime?$filter('date')(scope.startTime, 'HH:mm'): '',
                    e: scope.endTime?$filter('date')(scope.endTime, 'HH:mm'): ''
                }
            }, function(newValue, oldValue) {                
                ctrl.checkValidity();                
            }, true);

        }

    }

    function getHtmlTemplate() {
        return "<div ng-class=\"{'ng-valid': !isInvalid(), 'ng-invalid': isInvalid(), 'ng-invalid-order': isInvalid('order'), 'ng-invalid-empty': isInvalid('empty')}\">" +
          " <table> " +
          "   <tr> " +
          "     <td><timepicker-wrap ng-model=\"startTime\"></timepicker></td> " +
          "     <td> <i class=\"mdi mdi-chevron-right\"> </i> </td> " +
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
          "<div class=\"error-msg-container ng-invalid-order alert-error notice-spacer m-t-10\"><i class='mdi mdi-alert-octagon'></i> <span translate>EndTimeMustBeGreaterOrEqualToStartTime</span></div> " +
	  "<div class=\"error-msg-container ng-invalid-empty alert-error notice-spacer m-t-10\"><i class='mdi mdi-alert-octagon'></i> <span translate>StartTimeAndEndTimeMustBeSet</span></div>";

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
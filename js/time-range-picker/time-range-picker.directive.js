(function() {


    'use strict';

    angular.module('wfm.timerangepicker', [])
    .directive('timeRangePicker', [timeRangePicker]);
    

    function timeRangePicker() {
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
            list: postlink
        };

        function timeRangePickerCtrl($scope, $element) {

            $element.addClass('wfm-time-range-picker-wrap');
            if (!moment.isMoment($scope.startTime)) {
                $scope.startTime = moment($scope.startTime);
            }

            if (!moment.isMoment($scope.endTime)) {
                $scope.endTime = moment($scope.endTime);
            }

            $scope.nextDay = false;

            this.setDateValue = setDateValue;
            
            function setDateValue( m, nextDay) {
                m.set('month', 1).set('year', 2015);
                m.set('date', nextDay? 2: 1);
            }
            
        }

        function postlink(scope, elem, attrs, ctrls) {
            var ctrl = ctrls[0];

            scope.$watch('nextDay', function(newValue, oldValue) {
                ctrl.setDateValue(scope.endTime, newValue);
            });

        }

    }

    function getHtmlTemplate() {
        return " <table> " +
          "   <tr> " +
          "     <td><timepicker ng-model=\"startTime\"></timepicker></td> " +
          "     <td> <i class=\"mdi mdi-chevron-right\"> </i> </td> " +
          "     <td><timepicker ng-model=\"endTime\"></timepicker></td> " +
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
          " </table> ";

    }


})();
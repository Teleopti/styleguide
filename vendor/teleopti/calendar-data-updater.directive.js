(function() {

    'use strict';

    angular.module('teleopti.wfm')
    .directive('calendarDataUpdater', calendarDataUpdater);

    function calendarDataUpdater() {
        return {
            template: getTemplate(),

            link: postlink,
            scope: {
                dateRecords: '=',
                weekdayNames: '=?',
                startOfWeek: '@?'
            },
            controller: ['$scope', updaterCtrl]
        };

        function updaterCtrl($scope) {
            
            $scope.weekdayNames = angular.isDefined($scope.weekdayNames)?$scope.weekdayNames:
              ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            $scope.startOfWeek = angular.isDefined($scope.startOfWeek)?parseInt($scope.startOfWeek):0;
            $scope.weekDays = getWeekdays($scope.weekdayNames, $scope.startOfWeek);
            
            $scope.updater = { value: null };
	    $scope.muting = false;
            
            $scope.offset = calculateGridFirstRowOffset(
                $scope.dateRecords[0].date.getDay(), $scope.startOfWeek);

            $scope.switchInput = function (item, e) {
	        if (!e.altKey || $scope.muting) return;
                if (item.inputMode) return;
	        item.inputMode = true;
	        $scope.muting = true;
	        $scope.updater.value = item.value;
	    };

            $scope.finishInput = function (item, e) {	       
	        if (e.keyCode == 13) {
	            e.preventDefault();
	            updateAllSelectedFromUpdater();
	            item.inputMode = false;
	            $scope.muting = false;	           
	        } else if (e.keyCode == 27) {
	            e.preventDefault();	            
	            item.inputMode = false;
	            $scope.muting = false;
	        }	    
	    };

            function updateAllSelectedFromUpdater() {
                $scope.dateRecords.forEach(function(item) {
                    if (item.isSelected) item.value = $scope.updater.value;
                });
            }

            function getWeekdays(weekdayNames, startOfWeek) {
                var weekDays = [];            
                for (var i = 0; i < 7; i++) {                  
                    weekDays.push(weekdayNames[ (startOfWeek + i) % 7 ]);
                }             
                return weekDays;
            }

            function calculateGridFirstRowOffset(dayOfWeekFirstDay, startOfWeek) {
                for (var offset = 0; offset < 7; offset ++) {
                    if (( - dayOfWeekFirstDay + offset + startOfWeek) % 7 == 0 ) return offset;
                }
                return 0;
            }
        }

        function postlink(scope, elem, attr) {	   
            elem.addClass('calendar-data-updater');
        }
    }

    function getTemplate() {
        return  '<selectable-data-grid record-items="dateRecords" items-per-row="{{weekDays.length}}" starting-offset="{{offset}}" grid-headers="weekDays" inject="updater, switchInput, finishInput" mute="muting">' 
             + '<selectable-data-grid-cell>'
             + '<div class="day-month-flipper">'
             + '<div class="day-icon month-{{$item.date | date: \'M\' }}">{{ $item.date | date: \'d\'  }}</div>'
             + '<div class="month-icon month-{{$item.date | date: \'M\' }}">{{ $item.date | date: \'MMM\' }}</div>'
             +  '</div>'
             + '<div class="placeholder"></div>'
             +  '<div class="input-flipper" ng-click="switchInput($item, $event)">'
             +  '<div ng-show="!$item.inputMode">{{$item.value}}</div>'
             + '<input type="text" ng-model="updater.value" ng-show="$item.inputMode" ng-keyup="finishInput($item, $event)" />'
             + '</div>'
             + '</selectable-data-grid-cell>'
             + '</selectable-data-grid>';
    };

})();
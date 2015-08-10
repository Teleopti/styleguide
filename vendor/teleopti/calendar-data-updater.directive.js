(function() {

    'use strict';

    angular.module('teleopti.wfm')
           .directive('inputFlipper', inputFlipper)
           .directive('calendarDataUpdater', calendarDataUpdater);

    function inputFlipper() {

        return {
            template: getTemplate(),
            link: postlink,
            scope: {
                viewValue: '=',
                inputValue: '=',
                inputInit: '&',
                inputDone: '&',
                inputCancelled: '&'
            },
            restrict: 'E'
        };

        function postlink(scope, elem, attrs) {
            scope.inputMode = false;
            elem.addClass('input-flipper');

            scope.switchInput = function(e) {
                if (!e.altKey || scope.inputMode ) return;            	    
                if (scope.inputInit({ value: scope.viewValue})) {
                    scope.inputMode = true;
                    elem.find('input').focus();
                }
                
            }
            
            scope.inputKeyup = function(e) {
                if (e.keyCode == 13) {
	            e.preventDefault();	            
	            scope.inputMode = false;
                    scope.inputDone();
	        } else if (e.keyCode == 27) {
	            e.preventDefault();	            
	            scope.inputMode = false;
                    scope.inputCancelled();
	        }
            }            
        }

        function getTemplate() {
            return '<div ng-show="!inputMode" ng-mouseup="switchInput($event)">{{viewValue}}</div>'
                 + '<input type="text" ng-model="inputValue" ng-show="inputMode" ng-keyup="inputKeyup($event)" />';            
        }

    }
    
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
            
            $scope.weekdayNames = angular.isDefined($scope.weekdayNames)
                                ?$scope.weekdayNames
                                :['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            $scope.startOfWeek = angular.isDefined($scope.startOfWeek)
                               ?parseInt($scope.startOfWeek):0;
            $scope.weekDays = getWeekdays($scope.weekdayNames, $scope.startOfWeek);
            
            $scope.updater = { value: null };
	    $scope.muting = false;
            
            $scope.offset = calculateGridFirstRowOffset(
                $scope.dateRecords[0].date.getDay(), $scope.startOfWeek);

            $scope.switchInput = function (item, e) {
	        if (!e.altKey || $scope.muting) return;            	    
	        $scope.muting = true;
	        $scope.updater.value = item.value;
                $scope.$broadcast('input-flipper.input.mode');
	    };
            
            $scope.finishInput = finishInput;
            $scope.initInput = initInput;

            function initInput(value) {
                var debug;
                if ($scope.muting) {
                    debug = false;
                }
                else {
                    $scope.muting = true;
                    $scope.updater.value = value;
                    debug = true;
                }

                console.log('init input debug', debug);
                return debug;
            }

            function finishInput(isDone) {
                $scope.muting = false;
                if (isDone) updateAllSelectedFromUpdater();
            }

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

        function getTemplate() {
            return  '<selectable-data-grid record-items="dateRecords" items-per-row="{{weekDays.length}}" starting-offset="{{offset}}" grid-headers="weekDays" inject="updater, switchInput, finishInput, initInput" mute="muting">' 
                 + '<selectable-data-grid-cell>'
                 + '<div class="day-month-flipper">'
                 + '<div class="day-icon month-{{$item.date | date: \'M\' }}">{{ $item.date | date: \'d\'  }}</div>'
                 + '<div class="month-icon month-{{$item.date | date: \'M\' }}">{{ $item.date | date: \'MMM\' }}</div>'
                 +  '</div>'
                 + '<div class="placeholder"></div>'
                 +  '<input-flipper '
                 + ' view-value="$item.value"'
                 + ' input-value="updater.value"'
                 + ' input-init="initInput(value)"'
                 + ' input-done="finishInput(true)"'
                 + ' input-cancelled="finishInput(false)">'
                 + '</input-flipper>'
                 + '</selectable-data-grid-cell>'
                 + '</selectable-data-grid>';
        };
    }

   

})();
(function() {

    'use strict';

    angular.module('teleopti.wfm')
    .directive('inputFlipper', ['$timeout', inputFlipper])
    .directive('calendarDataUpdater', calendarDataUpdater);

    function inputFlipper($timeout) {

        return {
            template: getTemplate(),
            link: postlink,
            scope: {
                viewValue: '=',
                inputValue: '=',
                inputInit: '&'               
            },
            restrict: 'E'
        };

        function postlink(scope, elem, attrs) {
            scope.inputMode = false;
            elem.addClass('input-flipper');

            scope.switchInput = function(e) {                
                if (!e.altKey || scope.inputMode ) return;
                if (!scope.viewValue.isSelected) return;                
                e.stopPropagation();
                if (scope.inputInit({ value: scope.viewValue})) {
                    scope.inputMode = true;                    
                    $timeout(function() {
                        elem.find('input')[0].focus();
                    }, 200);
                }                
            }

            scope.$on('input-flipper.view.mode', function() {
                scope.inputMode = false;
            });
                       
        }

        function getTemplate() {
            return '<div ng-show="!inputMode" ng-mousedown="switchInput($event)">{{viewValue.value}}</div>'
                 + '<input type="text" ng-model="inputValue" ng-show="inputMode" />';            
        }

    }
    
    function calendarDataUpdater() {
        return {
            template: getTemplate(),
            require: ['calendarDataUpdater'],
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

            $scope.initInput = initInput;
            
            this.finishInput = finishInput;
            
            function initInput(item) {
                
                if ($scope.muting) {
                    return false;
                }
                else {
                    $scope.muting = true;
                    $scope.updater.value = item.value;
                    return  true;
                }
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

        function postlink(scope, elem, attr, ctrls) {
	    var ctrl = ctrls[0];
            elem.addClass('calendar-data-updater');

            scope.onKeyup = function(e) {
                if (e.keyCode == 13) {
	            e.preventDefault();
                    scope.$broadcast('input-flipper.view.mode');
                    ctrl.finishInput(true);
	        } else if (e.keyCode == 27) {
	            e.preventDefault();
                    scope.$broadcast('input-flipper.view.mode');
                    ctrl.finishInput(false);
	        }
            }            
        }

        function getTemplate() {
            return  '<selectable-data-grid record-items="dateRecords" items-per-row="{{weekDays.length}}" starting-offset="{{offset}}" grid-headers="weekDays" inject="updater, switchInput, finishInput, initInput" mute="muting" ng-keyup="onKeyup($event)" tabindex="1">' 
                 + '<selectable-data-grid-cell>'
                 + '<div class="day-month-flipper">'
                 + '<div class="day-icon month-{{$item.date | date: \'M\' }}">{{ $item.date | date: \'d\'  }}</div>'
                 + '<div class="month-icon month-{{$item.date | date: \'M\' }}">{{ $item.date | date: \'MMM\' }}</div>'
                 +  '</div>'
                 + '<div class="placeholder"></div>'
                 +  '<input-flipper '
                 + ' view-value="$item"'
                 + ' input-value="updater.value"'
                 + ' input-init="initInput(value)">'
                 + '</input-flipper>'
                 + '</selectable-data-grid-cell>'
                 + '</selectable-data-grid>';
        };
    }

   

})();
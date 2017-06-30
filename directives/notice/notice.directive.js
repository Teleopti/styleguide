(function() { 'use strict';
    var wfmNotice = angular.module('wfm.notice');

    wfmNotice.directive('wfmNotice', ['$timeout', '$rootScope', function($timeout, $rootScope) {
        return {
            restrict: 'EA',
            scope: {
                notices: '='
            },
            link: function(scope, el, ctrl) {
                scope.notices = scope.notices ? scope.notices : [];
                scope.deleteNotice = function(notice) {
                    notice.destroy();
                };

                $rootScope.$on('$stateChangeSuccess', function() {
                    scope.notices
                        .filter(function(notice) {
                            return notice.destroyOnStateChange;
                        })
                        .forEach(function(notice) {
                            scope.deleteNotice(notice);
                        });
                });

                scope.$watchCollection('notices', function(newNotices) {
                    newNotices.forEach(function(notice) {
                        if (notice.timeToLive !== null) {
                            $timeout(function() {
                                scope.deleteNotice(notice);
                            }, notice.timeToLive);
                        }
                    });
                });
            },
            template: '<div ng-repeat="notice in notices"><div class="notice-container"><div class="notice-item" ng-class="setType(notice)"><i ng-class="setIcon(notice)"></i><span ng-bind-html="notice.content"></span> <i class="pull-right mdi mdi-close notice-close" ng-click="deleteNotice(notice)"></i></div></div></div>' +
                '<button class="wfm-btn notice-item wfm-btn-default" ng-click="clearAll()" ng-if="notices.length>=3">Dismiss all</button>',
            controller: ['$scope', function($scope) {
                $scope.setType = function(notice) {
                    return notice.type;
                };
                $scope.clearAll = function() {
                    $scope.notices.splice(0, $scope.notices.length);
                };
                $scope.setIcon = function(notice) {
                    return notice.icon;
                };
            }]
        };
    }]);

})();

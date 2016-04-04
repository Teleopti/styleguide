'use strict';
(function() {
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
                    var index = scope.notices.indexOf(notice);
                    if (index > -1) {
                        scope.notices.splice(index, 1);
                    }
                };

                function destroyOnStateChange(notice) {
                    $rootScope.$on('$stateChangeSuccess', function() {
                        if (notice.destroyOnStateChange) {
                            scope.deleteNotice(notice);
                        } else {
                            return;
                        }
                    });
                }

                scope.$watchCollection('notices', function(newNotices) {
                    newNotices.forEach(function(notice) {
                        destroyOnStateChange(notice);
                        if (notice.timeToLive !== null) {
                            $timeout(function() {
                                scope.deleteNotice(notice);
                            }, notice.timeToLive);
                        } else {
                            return;
                        }
                    });
                });
            },
            template: '<div ng-repeat="notice in notices"><div class="materialcontainer"><div class="wfm-block wfm-notice" ng-class="setType(notice)"><i ng-class="setIcon(notice)"></i> <span ng-bind-html="notice.content"></span> <i class="pull-right mdi mdi-close" ng-click="deleteNotice(notice)"></i></div></div></div>',
            controller: ['$scope', function($scope) {
                $scope.setType = function(notice) {
                    return notice.type;
                };
                $scope.setIcon = function(notice) {
                    return notice.icon;
                };
            }]
        };
    }]);

})();

'use strict';
(function() {
    var wfmNotice = angular.module('wfm.notice', ['ngSanitize']);

    wfmNotice.directive('wfmNotice', function($timeout, $rootScope) {
        return {
            restrict: 'EA',
            scope: {
                notices: '='
            },
            link: function(scope, el, ctrl) {
                scope.notices = [];
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
                    console.log(newNotices);
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
            controller: function($scope) {
                $scope.setType = function(notice) {
                    switch (notice.type) {
                        case 'alert-success':
                            return 'alert-success';
                        case 'alert-error':
                            return 'alert-error';
                        case 'alert-info':
                            return 'alert-info';
                        case 'alert-warning':
                            return 'alert-warning';
                    }
                };

                $scope.setIcon = function(notice) {
                    switch (notice.type) {
                        case 'alert-success':
                            return 'mdi mdi-thumb-up';
                        case 'alert-error':
                            return 'mdi mdi-alert-octagon';
                        case 'alert-info':
                            return 'mdi mdi-alert-circle';
                        case 'alert-warning':
                            return 'mdi mdi-alert';
                    }
                };
            }
        };
    });

})();

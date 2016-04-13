(function() {
    'use strict';
    angular.module('wfm.notice')
		.service('NoticeService', ['$rootScope', function($rootScope) {
    var service = {};
    $rootScope.wfmNotices = $rootScope.wfmNotices ? $rootScope.wfmNotices : [];

    var types = {
        success: 'notice-success',
        error: 'notice-error',
        info: 'notice-info',
        warning: 'notice-warning',
    };

    var icons = {
        success: 'mdi mdi-thumb-up',
        error: 'mdi mdi-alert-octagon',
        info: 'mdi mdi-alert-circle',
        warning: 'mdi mdi-alert',
    };

    var addNotice = function(type, icon, content, timeToLive, destroyOnStateChange) {
        var notice = {
            type: type,
            icon: icon,
            content: content,
            timeToLive: timeToLive,
            destroyOnStateChange: destroyOnStateChange
        };

        $rootScope.wfmNotices.push(notice);
    };

    service.warning = function(content, timeToLive, destroyOnStateChange) {
        addNotice(types.warning, icons.warning, content, timeToLive, destroyOnStateChange);
    };
    service.error = function(content, timeToLive, destroyOnStateChange) {
        addNotice(types.error, icons.error, content, timeToLive, destroyOnStateChange);
    };
    service.info = function(content, timeToLive, destroyOnStateChange) {
        addNotice(types.info, icons.info, content, timeToLive, destroyOnStateChange);
    };
    service.success = function(content, timeToLive, destroyOnStateChange) {
        addNotice(types.success, icons.success, content, timeToLive, destroyOnStateChange);
    };

    return service;
}]);
})();

(function() {
    'use strict';
    angular.module('wfm.notice')
		.service('NoticeService', ['$rootScope', function($rootScope) {
    var service = {};
    $rootScope.wfmNotices = $rootScope.wfmNotices ? $rootScope.wfmNotices : [];
    var types = {
        success: 'alert-success',
        error: 'alert-error',
        info: 'alert-info',
        warning: 'alert-warning',
        detail: 'alert-detail'
    };

    function addNotice(type, content, timeToLive, destroyOnStateChange) {
        var notice = {
            type: type,
            content: content,
            timeToLive: timeToLive,
            destroyOnStateChange: destroyOnStateChange
        };
        $rootScope.wfmNotices.push(notice);
        console.log($rootScope.wfmNotices);
    }

    service.warning = function(content, timeToLive, destroyOnStateChange) {
        addNotice(types.warning, content, timeToLive, destroyOnStateChange);
    };
    service.error = function(content, timeToLive, destroyOnStateChange) {
        addNotice(types.error, content, timeToLive, destroyOnStateChange);
    };
    service.info = function(content, timeToLive, destroyOnStateChange) {
        addNotice(types.info, content, timeToLive, destroyOnStateChange);
    };
    service.success = function(content, timeToLive, destroyOnStateChange) {
        addNotice(types.success, content, timeToLive, destroyOnStateChange);
    };

    return service;
}]);
})();

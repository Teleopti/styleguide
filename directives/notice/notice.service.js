(function() {
    'use strict';
    var uid = (function() {
        var uid = -1;
        return function () {
            return ++uid;
        };
    })();
    angular.module('wfm.notice').service('NoticeService', ['$rootScope', function($rootScope) {
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
            var id = uid();
            var notice = {
                id: id,
                type: type,
                icon: icon,
                content: content,
                timeToLive: timeToLive,
                destroyOnStateChange: destroyOnStateChange,
                destroy: function () {
                    $rootScope.wfmNotices = $rootScope.wfmNotices.filter(function(notice) {
                        return notice.id !== id;
                    });
                }
            };

            var removeIndex = $rootScope.wfmNotices.map(function(item) { return item.content; }).indexOf(notice.content);
            if (removeIndex == -1) {
                $rootScope.wfmNotices.push(notice);
            }

            return {
                destroy: notice.destroy
            };
        };

        service.warning = function(content, timeToLive, destroyOnStateChange) {
            return addNotice(types.warning, icons.warning, content, timeToLive, destroyOnStateChange);
        };
        service.error = function(content, timeToLive, destroyOnStateChange) {
            return addNotice(types.error, icons.error, content, timeToLive, destroyOnStateChange);
        };
        service.info = function(content, timeToLive, destroyOnStateChange) {
            return addNotice(types.info, icons.info, content, timeToLive, destroyOnStateChange);
        };
        service.success = function(content, timeToLive, destroyOnStateChange) {
            return addNotice(types.success, icons.success, content, timeToLive, destroyOnStateChange);
        };

        return service;
    }]);
})();

(function() {
    'use strict';
    describe('wfmNotice', function() {
        var elementCompile,
            rootScope,
            directiveScope;

        beforeEach(
            function() {
                module('wfm.notice');
            }
        );

        beforeEach(inject(function($compile, $rootScope) {
            rootScope = $rootScope.$new();
        }));

        it('should display a notice created with NoticeService', inject(function($compile, $injector) {
            var element = '<wfm-notice notices="wfmNotices"></wfm-notice>';
            elementCompile = $compile(element)(rootScope);
            var noticeService = $injector.get('NoticeService', {
                $rootScope: rootScope
            });
            rootScope.$digest();
            noticeService.warning('test', 5000, false);
            rootScope.$digest();

            expect(elementCompile[0].querySelectorAll('.notice-item').length).toBe(1);
        }));

        it('should display a newly added notice', inject(function($compile, $injector) {
            var element = '<wfm-notice notices="wfmNotices"></wfm-notice>';
            elementCompile = $compile(element)(rootScope);
            var noticeService = $injector.get('NoticeService', {
                $rootScope: rootScope
            });
            rootScope.$digest();
            noticeService.warning('test1', null, false);
            noticeService.warning('test2', null, false);
            rootScope.$digest();

            expect(elementCompile[0].querySelectorAll('.notice-item').length).toBe(2);
        }));

        it('should display not add a existing notice', inject(function($compile, $injector) {
            var element = '<wfm-notice notices="wfmNotices"></wfm-notice>';
            elementCompile = $compile(element)(rootScope);
            var noticeService = $injector.get('NoticeService', {
                $rootScope: rootScope
            });
            rootScope.$digest();
            noticeService.warning('test1', null, false);
            noticeService.warning('test1', null, false);
            rootScope.$digest();

            expect(elementCompile[0].querySelectorAll('.notice-item').length).toBe(1);
        }));

        it('should remove current notice after time to live', function(done) {
            inject(function($compile, $injector, $timeout) {
                var element = '<wfm-notice notices="wfmNotices"></wfm-notice>';
                elementCompile = $compile(element)(rootScope);
                var noticeService = $injector.get('NoticeService', {
                    $rootScope: rootScope
                });
                rootScope.$digest();
                noticeService.warning('test', 3000, false);
                rootScope.$digest();

                $timeout(function() {
                    expect(elementCompile[0].querySelectorAll('.notice-item').length).toBe(0);
                    done();
                }, 5000);
                $timeout.flush();
            });
        });

        it('should remove current notice after time to live and keep second notice', function(done) {
            inject(function($compile, $injector, $timeout) {
                var element = '<wfm-notice notices="wfmNotices"></wfm-notice>';
                elementCompile = $compile(element)(rootScope);
                var noticeService = $injector.get('NoticeService', {
                    $rootScope: rootScope
                });
                rootScope.$digest();
                noticeService.warning('test1', 3000, false);
                noticeService.warning('test2', null, false);
                rootScope.$digest();

                $timeout(function() {
                    expect(elementCompile[0].querySelectorAll('.notice-item').length).toBe(1);
                    done();
                }, 5000);
                $timeout.flush();
            });
        });

        it('should remove notice with shortest time to live first', function(done) {
            inject(function($compile, $injector, $timeout) {
                var element = '<wfm-notice notices="wfmNotices"></wfm-notice>';
                elementCompile = $compile(element)(rootScope);
                var noticeService = $injector.get('NoticeService', {
                    $rootScope: rootScope
                });
                rootScope.$digest();

                noticeService.info('test', 10000, false);
                noticeService.warning('test2', 3000, false);
                rootScope.$digest();

                $timeout(function() {
                    expect(elementCompile[0].querySelectorAll('.notice-item.notice-info').length).toBe(1);
                    done();
                }, 5000);
                $timeout.flush();
            });
        });

        it('should remove notice on call', inject(function($compile, $injector) {
            var element = '<wfm-notice notices="wfmNotices"></wfm-notice>';
            elementCompile = $compile(element)(rootScope);
            var noticeService = $injector.get('NoticeService', {
                $rootScope: rootScope
            });
            rootScope.$digest();
            var notice = noticeService.warning('test', null, false);
            rootScope.$digest();
            notice.destroy();
            rootScope.$digest();

            expect(elementCompile[0].querySelectorAll('.notice-item').length).toBe(0);
        }));

        it('should remove the correct notice on call', inject(function($compile, $injector) {
            var element = '<wfm-notice notices="wfmNotices"></wfm-notice>';
            elementCompile = $compile(element)(rootScope);
            var noticeService = $injector.get('NoticeService', {
                $rootScope: rootScope
            });
            rootScope.$digest();
            var notice1 = noticeService.warning('test', null, false);
            var notice2 = noticeService.info('test2', null, false);
            rootScope.$digest();
            notice1.destroy();
            rootScope.$digest();

            expect(elementCompile[0].querySelectorAll('.notice-item').length).toBe(1);
            expect(elementCompile[0].querySelectorAll('.notice-item.notice-info').length).toBe(1);
        }));

        it('should not break when notice is already removed', function(done) {
            inject(function($compile, $injector, $timeout) {
                var element = '<wfm-notice notices="wfmNotices"></wfm-notice>';
                elementCompile = $compile(element)(rootScope);
                var noticeService = $injector.get('NoticeService', {
                    $rootScope: rootScope
                });
                rootScope.$digest();
                var notice1 = noticeService.warning('test', 500, false);
                var notice2 = noticeService.info('test2', 100, false);
                rootScope.$digest();
                $timeout(function() {
                    expect(elementCompile[0].querySelectorAll('.notice-item').length).toBe(1);
                    notice2.destroy();
                    expect(elementCompile[0].querySelectorAll('.notice-item').length).toBe(1);
                    done();
                }, 150);
                $timeout.flush();
            });
        });

        it('should destroy notices on state changes', inject(function($compile, $injector) {
            var element = '<wfm-notice notices="wfmNotices"></wfm-notice>';
            elementCompile = $compile(element)(rootScope);
            var noticeService = $injector.get('NoticeService', {
                $rootScope: rootScope
            });
            rootScope.$digest();
            var notice1 = noticeService.warning('test', null, true);
            rootScope.$digest();

            rootScope.$emit('$stateChangeSuccess');
            rootScope.$digest();

            expect(elementCompile[0].querySelectorAll('.notice-item').length).toBe(0);
        }));
    });
})();

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

        it('should display a notice', inject(function($compile) {
            var element = '<wfm-notice notices="notices"></wfm-notice>';
            elementCompile = $compile(element)(rootScope);
            rootScope.$digest();

            rootScope.notices = ['test'];
            rootScope.$digest();

            expect(elementCompile[0].querySelectorAll('.notice-item').length).toBe(1);
        }));

        it('should display a newly added notice', inject(function($compile) {
            var element = '<wfm-notice notices="notices"></wfm-notice>';
            elementCompile = $compile(element)(rootScope);
            rootScope.$digest();

            rootScope.notices = ['test'];
            rootScope.$digest();
            rootScope.notices.push('test2');
            rootScope.$digest();

            expect(elementCompile[0].querySelectorAll('.notice-item').length).toBe(2);
        }));

        it('should remove current notice after time to live', function(done) {
            inject(function($compile, $timeout) {
                var element = '<wfm-notice notices="notices"></wfm-notice>';
                elementCompile = $compile(element)(rootScope);
                rootScope.$digest();

                rootScope.notices = [{
                    content: 'test',
                    timeToLive: 3000
                }];
                rootScope.$digest();

                $timeout(function() {
                    expect(elementCompile[0].querySelectorAll('.notice-item').length).toBe(0);
                    done();
                }, 5000);
                $timeout.flush();
            });
        });

        it('should remove current notice after time to live and keep second notice', function(done) {
            inject(function($compile, $timeout) {
                var element = '<wfm-notice notices="notices"></wfm-notice>';
                elementCompile = $compile(element)(rootScope);
                rootScope.$digest();

                rootScope.notices = [{
                    content: 'test',
                    timeToLive: 3000
                }, {
                    content: 'test2',
                    timeToLive: null
                }];
                rootScope.$digest();

                $timeout(function() {
                    expect(elementCompile[0].querySelectorAll('.notice-item').length).toBe(1);
                    done();
                }, 5000);
                $timeout.flush();
            });
        });

        it('should remove notice with shortest time to live first', function(done) {
            inject(function($compile, $timeout) {
                var element = '<wfm-notice notices="notices"></wfm-notice>';
                elementCompile = $compile(element)(rootScope);
                rootScope.$digest();

                rootScope.notices = [{
                    content: 'test',
                    timeToLive: 10000
                }, {
                    content: 'test2',
                    timeToLive: 3000
                }];
                rootScope.$digest();

                $timeout(function() {
                    expect(elementCompile[0].querySelectorAll('.notice-item').length).toBe(1);
                    done();
                }, 5000);
                $timeout.flush();
            });
        });

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

    });
})();

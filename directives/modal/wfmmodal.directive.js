(function() {
    'use strict';
    var app;

    app = angular.module('wfm.modal', []);

    app.provider('ngModalDefaults', function() {
        return {
            options: {
                closeButtonHtml: '<div class="head-actions panel-menu"><div tabindex=0 class="context-menu card-context"><i class="mdi mdi-close"></i></div></div>'
            },
            $get: function() {
                return this.options;
            },
            set: function(keyOrHash, value) {
                var k, v, _results;
                if (typeof keyOrHash === 'object') {
                    _results = [];
                    for (k in keyOrHash) {
                        if (keyOrHash.hasOwnProperty(k)) {
                            v = keyOrHash[k];
                            _results.push(this.options[k] = v);
                        }
                    }
                    return _results;
                } else {
                    this.options[keyOrHash] = value;
                    return this.options[keyOrHash];
                }
            }
        };
    });

    app.directive('modalDialog', [
        'ngModalDefaults', '$sce',
        function(ngModalDefaults, $sce) {
            return {
                restrict: 'E',
                scope: {
                    show: '=',
                    dialogTitle: '@',
                    onClose: '&?',
                    infos: '='
                },
                replace: true,
                transclude: true,
                link: function(scope, element, attrs) {
                    var setupCloseButton, setupStyle;
                    setupCloseButton = function() {
                        scope.closeButtonHtml = $sce.trustAsHtml(ngModalDefaults.closeButtonHtml);
                    };
                    scope.hideModal = function() {
                        var activeSelect = document.getElementsByClassName('md-select-menu-container md-active');
                        if (activeSelect.length > 0) {
                            activeSelect[0].remove();
                        }

                        var selectBackdrop = document.getElementsByClassName('md-select-backdrop');
                        if (selectBackdrop.length > 0) {
                            selectBackdrop[0].remove();
                        }

                        var scrollMask = document.getElementsByClassName('md-scroll-mask');
                        if (scrollMask.length > 0) {
                            scrollMask[0].remove();
                        }
                        scope.show = false;
                    };
                    scope.$watch('show', function(newVal, oldVal) {
                        if ((!newVal && oldVal) && (scope.onClose != null)) {
                            return scope.onClose();
                        }
                    });
                    setupCloseButton();
                },
                template: '<div class=\'click-modal modal-box\' ng-show=\'show\'>' +
                    '<div class=\'modalbg\' ng-click=\'hideModal()\'></div>' +
                    '<div class=\'dialog material-depth-1\' ng-style=\'dialogStyle\'>' +
                    '<div ng-click=\'hideModal()\' ng-bind-html=\'closeButtonHtml\'></div>' +
                    '<div ng-transclude></div>' +
                    '</div>' +
                    '</div>'
            };
        }
    ]);

})();

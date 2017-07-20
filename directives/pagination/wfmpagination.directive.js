(function() { 'use strict';
    var wfmPagination = angular.module('wfm.pagination', []);
    wfmPagination.run(['$templateCache', function($templateCache) {
        $templateCache.put('wfm-pagination-default.tpl.html',
        '<div class="pagination" ng-if="vm.paginationOptions.totalPages > 0">' +
        '	<ul>' +
        '		<li class=" pagination-item" ng-class="{disabled: vm.paginationOptions.pageNumber == 1 || vm.paginationOptions.totalPages == 0}"' +
        '		style="padding-top: 4px; padding-bottom: 4px;">' +
        '			<a href="" ng-click="vm.gotoPage(1)">' +
        '				<i class="mdi mdi-skip-previous"></i>' +
        '			</a>' +
        '		</li>' +
        '		<li class="pagination-item" ng-class="{disabled: vm.paginationOptions.pageNumber == 1 || vm.paginationOptions.totalPages == 0}"' +
        '		style="padding-top: 4px; padding-bottom: 4px;">' +
        '			<a href="" ng-click="vm.gotoPage(vm.paginationOptions.pageNumber - 1)">' +
        '				<i class="mdi mdi-chevron-left"></i>' +
        '			</a>' +
        '		</li>' +
        '		<li class="pagination-item" ng-repeat="n in vm.getVisiblePageNumbers()"' +
        '			ng-class="{active: n == vm.paginationOptions.pageNumber}" ng-click="vm.gotoPage(n)" style="padding-top: 4px; padding-bottom: 4px;">' +
        '			<a href="" ng-bind="n"></a>' +
        '		</li>' +
        '		<li class="pagination-item" ng-class="{disabled: vm.paginationOptions.pageNumber == vm.paginationOptions.totalPages || vm.paginationOptions.totalPages == 0}"' +
        '		style="padding-top: 4px; padding-bottom: 4px;">' +
        '			<a href="" ng-click="vm.gotoPage(vm.paginationOptions.pageNumber + 1)">' +
        '				<i class="mdi mdi-chevron-right"></i>' +
        '			</a>' +
        '		</li>' +
        '		<li class="pagination-item" ng-class="{disabled: vm.paginationOptions.pageNumber == vm.paginationOptions.totalPages || vm.paginationOptions.totalPages == 0}"' +
        '		style="padding-top: 4px; padding-bottom: 4px;">' +
        '			<a href="" ng-click="vm.gotoPage(vm.paginationOptions.totalPages)">' +
        '				<i class="mdi mdi-skip-next"></i>' +
        '			</a>' +
        '		</li>' +
        '	</ul>' +
        '</div>'
        );
    }]);
})();

(function () {
    var WfmPaginationCtrl = function ($scope) {
        var vm = this;
        vm.gotoPage = function (pageIndex) {
            if (pageIndex < 1 || pageIndex > vm.paginationOptions.totalPages) {
                return;
            }
            vm.paginationOptions.pageNumber = pageIndex;
            if (vm.getDataForPageCallback !== undefined) {
                vm.getDataForPageCallback(pageIndex);
            }
        };

        vm.getVisiblePageNumbers = function (start, end) {
            var displayPageCount = 5;
            var ret = [];

            if (!start) {
                start = vm.paginationOptions.totalPages;
            }

            if (!end) {
                end = start;
                start = 1;
            }

            var leftBoundary = start;
            var rightBoundary = end;
            if (end - start >= displayPageCount) {
                var index = vm.paginationOptions.pageNumber;

                if (index < displayPageCount - 1) {
                    leftBoundary = 1;
                    rightBoundary = displayPageCount;
                } else if (end - index < 3) {
                    leftBoundary = end - displayPageCount + 1;
                    rightBoundary = end;
                } else {
                    leftBoundary = getLeftBoundary(index, displayPageCount);
                    rightBoundary = getRightBoundary(index, displayPageCount, end);
                }
            }

            for (var i = leftBoundary; i <= rightBoundary ; i++) {
                ret.push(i);
            }

            return ret;
        };

        function getLeftBoundary(index, displayPageCount) {
            return index - Math.floor(displayPageCount / 2) > 1 ? index - Math.floor(displayPageCount / 2) : 1;
        }

        function getRightBoundary(index, displayPageCount, end) {
            return index + Math.floor(displayPageCount / 2) > end ? end : index + Math.floor(displayPageCount / 2);
        }
    };
    var directive = function () {
        return {
            controller: 'WfmPaginationCtrl',
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'wfm-pagination-default.tpl.html',
            scope: {
                paginationOptions: '=?',
                getDataForPageCallback: '=?'
            },
            link: linkFunction
        };
    };
    angular.module('wfm.pagination')
    .directive('wfmPagination', directive)
    .controller('WfmPaginationCtrl', ['$scope', WfmPaginationCtrl]);

    function linkFunction(scope, elem, attrs, vm) {

    }
}());

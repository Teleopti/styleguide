(function() {
    'use strict';
    angular.module('wfm.culturalDatepicker', ['currentUserInfoService'])
        .controller('CulturalDatepickerCtrl', ['$scope', 'CurrentUserInfo', function($scope, CurrentUserInfo) {
            var dateFormat = CurrentUserInfo.CurrentUserInfo().DateFormatLocale;
            $scope.isJalaali = dateFormat === 'fa-IR' ? true : false;
            $scope.isGregorian = !$scope.isJalaali;
        }])
        .directive('wfmCulturalDatepicker', function() {
            var jalaaliTemplate = '<persian-datepicker ng-if="isJalaali" ng-model="date" class="wfm-datepicker"></persian-datepicker>';
            var gregorianTemplate = '<div uib-datepicker ng-if="isGregorian" ng-model="date" datepicker-options="datepickerOptions" class="wfm-datepicker"></div>';
            return {
                controller: 'CulturalDatepickerCtrl',
                restrict: 'E',
                scope: {
                    date: '=ngModel',
                    datepickerOptions: '=datepickerOptions'
                },
                template: '<div class="wfm-datepicker-wrap wfm-cultural-datepicker-container">' + jalaaliTemplate + gregorianTemplate + '</div>'
            };
        });
})();

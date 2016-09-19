(function() {
'use strict';
angular.module('wfm.culturalDatepicker', ['currentUserInfoService'])
.controller('CulturalDatepickerCtrl', ['$scope', 'CurrentUserInfo', function($scope, CurrentUserInfo) {
    var dateFormat = CurrentUserInfo.CurrentUserInfo().DateFormatLocale;
    $scope.isJalaali = dateFormat === 'fa-IR' ? true : false;
    $scope.isGregorian = !$scope.isJalaali;
}])
.directive('wfmCulturalDatepicker', function() {
    return {
        controller: 'CulturalDatepickerCtrl',
        restrict: 'E',
        scope: {
            date: '=ngModel'
        },
        template: '<div class="wfm-datepicker-wrap wfm-cultural-datepicker-container"><persian-datepicker ng-if="isJalaali" ng-model="date" class="wfm-datepicker"></persian-datepicker><div uib-datepicker ng-if="isGregorian" ng-model="date" class="wfm-datepicker"></div></div>'
    };
});
})();

(function() {
'use strict';
angular.module('wfm.culturalDatepicker', ['currentUserInfoService'])
.controller('CulturalDatepickerCtrl', ['$scope', 'CurrentUserInfo', function($scope, CurrentUserInfo) {
    $scope.dt = new Date();
    var dateFormat = CurrentUserInfo.CurrentUserInfo().DateFormatLocale;
    $scope.isJalaali = dateFormat === 'fa-IR' ? true : false;
    $scope.isGregorian = !$scope.isJalaali;
}])
.directive('wfmCulturalDatepicker', function() {
    return {
        bindToController: true,
        controller: 'CulturalDatepickerCtrl',
        controllerAs: 'ctrl',
        restrict: 'E',
        scope: {
            dt: '='
        },
        templateUrl: 'directives/cultural-datepicker/cultural-datepicker.tpl.html'
    };
});
})();
